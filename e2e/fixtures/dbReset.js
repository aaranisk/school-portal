const {execSync} = require('child_process');

function resetDB() {
    execSync(
        'docker exec -i school_portal_db psql -U postgres -d school_portal -c "TRUNCATE TABLE teachers, classes RESTART IDENTITY CASCADE;"',
        {stdio: 'inherit'}
    );
}

module.exports = {resetDB};

