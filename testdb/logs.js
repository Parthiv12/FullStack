// Logger functions for different events
const logDatabaseStart = () => {
    console.log('\n🚀 Database Events Logger Started');
    console.log('✅ Connected to MongoDB Atlas\n');
};

const logDatabaseError = (err) => {
    console.error('\n❌ Database connection error:', err);
};

const logDatabaseDisconnect = () => {
    console.log('\n🔌 Database Disconnected');
};

const logDatabaseReconnect = () => {
    console.log('\n🔄 Database Reconnected\n');
};

const logUserCreationAttempt = (name, email) => {
    console.log('\n📝 New User Creation Attempt:');
    console.log('   Name:', name);
    console.log('   Email:', email);
    console.log('   Time:', new Date().toLocaleString());
};

const logUserCreationSuccess = (id) => {
    console.log('✅ User Successfully Created!');
    console.log('   ID:', id, '\n');
};

const logUserLoginSuccess = (email) => {
    console.log('✅ User Successfully Logged In:', email);
};

const logUserLoginError = (message) => {
    console.log('❌ Login Error:', message);
};

const logUserRegistrationError = (message) => {
    console.log('❌ User Registration Error:', message);
};

const logRequest = (method, path, body) => {
    console.log('\n📨 Incoming Request:');
    console.log('   Method:', method);
    console.log('   Path:', path);
    console.log('   Body:', JSON.stringify(body));
    console.log('   Time:', new Date().toLocaleString(), '\n');
};

const logUsersList = (users) => {
    console.log('\n📋 Fetching all users:');
    users.forEach(user => {
        console.log(`   👤 ${user.name} (${user.email})`);
    });
};

const logUsersListError = (message) => {
    console.log('❌ Error fetching users:', message);
};

const logServerStart = (port) => {
    console.log(`✨ Server running at http://localhost:${port}\n`);
};

module.exports = {
    logDatabaseStart,
    logDatabaseError,
    logDatabaseDisconnect,
    logDatabaseReconnect,
    logUserCreationAttempt,
    logUserCreationSuccess,
    logUserLoginSuccess,
    logUserLoginError,
    logUserRegistrationError,
    logRequest,
    logUsersList,
    logUsersListError,
    logServerStart
}; 