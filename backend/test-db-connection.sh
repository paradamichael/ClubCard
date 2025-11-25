#!/bin/sh
# Database connection diagnostic script
# Tests network connectivity before Spring Boot starts

echo "=========================================="
echo "DATABASE CONNECTION DIAGNOSTICS"
echo "=========================================="

# Extract host and port from JDBC URL
DB_HOST=$(echo "$SPRING_DATASOURCE_URL" | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PORT=$(echo "$SPRING_DATASOURCE_URL" | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')

echo "JDBC URL: $SPRING_DATASOURCE_URL"
echo "Extracted Host: $DB_HOST"
echo "Extracted Port: $DB_PORT"
echo "Username: $SPRING_DATASOURCE_USERNAME"
echo ""

# Test 1: DNS Resolution
echo "Test 1: DNS Resolution"
echo "----------------------"
if nslookup "$DB_HOST" > /dev/null 2>&1; then
    echo "✓ DNS resolution successful for $DB_HOST"
    nslookup "$DB_HOST" | grep -A 2 "Name:"
else
    echo "✗ DNS resolution failed for $DB_HOST"
fi
echo ""

# Test 2: Ping (ICMP)
echo "Test 2: Ping Test"
echo "-----------------"
if ping -c 3 -W 2 "$DB_HOST" > /dev/null 2>&1; then
    echo "✓ Ping successful to $DB_HOST"
else
    echo "✗ Ping failed (may be blocked by firewall, not critical)"
fi
echo ""

# Test 3: TCP Connection (most important)
echo "Test 3: TCP Connection Test"
echo "---------------------------"
if nc -zv -w 5 "$DB_HOST" "$DB_PORT" 2>&1; then
    echo "✓ TCP connection successful to $DB_HOST:$DB_PORT"
else
    echo "✗ TCP connection FAILED to $DB_HOST:$DB_PORT"
    echo "  This indicates a network/firewall issue"
fi
echo ""

# Test 4: Try alternate port if session pooler
if [ "$DB_PORT" = "5432" ]; then
    echo "Test 4: Testing Transaction Pooler (port 6543)"
    echo "----------------------------------------------"
    if nc -zv -w 5 "$DB_HOST" 6543 2>&1; then
        echo "✓ Port 6543 is also accessible"
    else
        echo "✗ Port 6543 is not accessible"
    fi
elif [ "$DB_PORT" = "6543" ]; then
    echo "Test 4: Testing Session Pooler (port 5432)"
    echo "------------------------------------------"
    if nc -zv -w 5 "$DB_HOST" 5432 2>&1; then
        echo "✓ Port 5432 is also accessible"
    else
        echo "✗ Port 5432 is not accessible"
    fi
fi
echo ""

echo "Test 5: PostgreSQL Protocol Connection Test"
echo "--------------------------------------------"
if command -v psql > /dev/null 2>&1; then
    echo "Testing actual PostgreSQL connection..."
    PGPASSWORD="$SPRING_DATASOURCE_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$SPRING_DATASOURCE_USERNAME" -d postgres -c "SELECT version();" 2>&1 | head -10
    if [ $? -eq 0 ]; then
        echo "✓ PostgreSQL connection successful!"
    else
        echo "✗ PostgreSQL connection failed (see error above)"
        echo "  This indicates authentication or IP restriction issue"
    fi
else
    echo "psql not available, skipping PostgreSQL protocol test"
fi
echo ""

echo "=========================================="
echo "Network diagnostics complete. Starting application..."
echo "=========================================="
echo ""
