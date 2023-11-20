

export const getURL = (req, profilePicture: string ) =>{
    if(!profilePicture) return ''
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return `${baseUrl}/users/images/${profilePicture}`
}