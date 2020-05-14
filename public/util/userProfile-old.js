// const connectionDB = require('./connectionDB');
// const userConnModel = require('./../models/UserConnection');

// let self = {};

// self.userId = "manoj123";
// self.userConnections = [];

// self.addConnectionById = (connectionId, rsvp) => {
//     let index = self.getIndexOfConnectionById(connectionId);

//     if(index == -1) {
//         var theID = connectionDB.getConnection(connectionId);
//         self.userConnections.push(new userConnModel(theID,rsvp));
//         // console.log("things:",self.userConnections);
//         return "saved";
//     } else {
//         self.userConnections[index] = null
//         return "updated";
//     }
// }

// self.removeConnectionById = (connectionId) => {
//     let index = self.getIndexOfConnectionById(connectionId);
//     if(index == -1) {
//         return false;
//     } else {
//         self.userConnections.splice(index);
//         return true;
//     }
// }

// self.getIndexOfConnectionById = (connectionId) => {
//     // console.log(connectionId);
//     // return (self.userConnections.filter(i => i.connectionId == connectionId));
//     function checker(item){

//         console.log(self.userConnections);
//         return item.connection.connectionId == connectionId;
//     }
//     var dat = self.userConnections.filter(checker);
//     // console.log(dat);
//     return (self.userConnections.filter(i => i.connectionID == connectionID));
// }

// self.updateRsvpById = (connectionId, rsvpValue) => {
//     let index = self.getIndexOfConnectionById(connectionId);
//     if(index == -1) {
//         return false;
//     } else {
//         self.userConnections[index].rsvp = rsvpValue;
//         return true;
//     }
// }

// self.getUserConnections = () => {
//     return self.userConnections;
// }

// module.exports = self;