module.exports = getDate
function getDate(){
    var options = {weekday: 'long',year: 'numeric',month:'long',day:'numeric'}
    var today = new Date()
    
    var day = today.toLocaleString("en-US",options)
    return day    
}

