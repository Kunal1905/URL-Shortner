const sessionToUseMap = new Map();

function setUser(sessionId, user) {
    sessionToUseMap.set(sessionId, user);
    console.log(`User set for session: ${sessionId}`)
}

function getUser(sessionId) {
    const user = sessionToUseMap.get(sessionId);
    console.log(`Retriving user for session: ${sessionId}, found:`, user)
    return user;
}

module.exports = {
    setUser,
    getUser
}