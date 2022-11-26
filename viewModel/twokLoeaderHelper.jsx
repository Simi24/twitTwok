import CommunicationController from "../model/CC";
import Twok from "../model/twok"
import StorageManager from "../model/storeManager";

let sid = null;
StorageManager.getSid()
.then(result => sid = result)
    
let SM = new StorageManager();

export default class TwokLoaderHelper{

    async handleGetPicture(uid){
        await CommunicationController.getPicture(sid, uid)
<<<<<<< Updated upstream
        .then(result=> {this.handleStoreUserPicture(result.uid, result.pversion, result.picture)} )
    }
    

    async handleStoreUserPicture(sid, uid){
        
        await CommunicationController.getPicture(sid, uid)
                .then(
                    resultGetPicture => {
                        console.log(resultGetPicture.picture)
                        SM.getUserPicture(resultGetPicture.uid,
                            risultatoGetPicture => {console.log('il risultato del GetPicture:', risultatoGetPicture); if(risultatoGetPicture == 1){
                                console.log('entro')
                                SM.storeUserPicture(resultGetPicture.uid, resultGetPicture.pversion, resultGetPicture.picture,
                                    risultatoStorePicture => console.log('Nuovo utente inserito ', (risultatoStorePicture)),
                                    error => console.log('errore in storeUserPicture', error)
                                    )
                                console.log(resultGetPicture.pversion, risultatoGetPicture)
                            }else if((resultGetPicture.pversion) < (risultatoGetPicture.pVersion)){
                                SM.updateUserPicture(resultGetPicture.uid, resultGetPicture.pversion, resultGetPicture.picture,
                                    risultatoUpdate => console.log('Immagine utente aggiornata', risultatoUpdate),
                                    error => console.log('errore in UpdateUser', error)
                                    )
                            }else {
                                console.log('non dobbiamo aggiornare niente')
                            }},
                            error => console.log('errore in getUserPicture', error)
                            )
                    }
    )}
=======
                .then(
                    result => {
                        //TODO: posso settare l'immagine nel DB già con il placeholder, per evitare gli if nelle row
                        /*if(result.picture == null){
                            console.log("Prendo l'immagine che non ho")
                            SM.storeUserPicture(result.uid, result.pversion, result.name, result.name,
                                risultatoStorePicture => console.log('Nuovo utente inserito'),
                                error => console.log('errore in store user picture ',error)
                            )
                        }*/
                        console.log("Prendo l'immagine che non ho")
                        SM.storeUserPicture(result.uid, result.pversion, result.name, result.picture,
                            risultatoStorePicture => console.log('Nuovo utente inserito'),
                            error => console.log('errore in store user picture ',error)
                            )
                    }
                )
    }


    async handleUpdatePicture(uid, name){
        await CommunicationController.getPicture(sid, uid)
                .then(
                    result => {
                        console.log("Update User")
                        SM.updateUserPicture(result.uid, result.pversion, result.picture, result.name,
                            risultatoUpdatePicture => console.log('Utente aggiornato'),
                            error => console.log('errore in store user picture ',error)
                            )
                    }
                )
    }

    async handleStoreUserPicture2(sid, uid, pversion, name){
        //console.log('pversion del getTwok: ', pversion)
        //ritorna picture, name e pVersion
        SM.getUserPicture(uid,
            risultatoGetUserPicture => {console.log('Utente trovato nel DB', pversion, risultatoGetUserPicture.pVersion, name, risultatoGetUserPicture.name) ; if(risultatoGetUserPicture == 1){
                console.log('Utente non trovato nel DB, inseriamolo')
                this.handleStoreNewPicture(uid, name)
            } else if((pversion > risultatoGetUserPicture.pVersion) || (name != risultatoGetUserPicture.name)) {
                this.handleUpdatePicture(uid, name)
            } else {
                console.log('Non dobbiamo aggiornare il db')
            }},
            error => console.log('errore in getUserPicture', error)
            )
    }
>>>>>>> Stashed changes
    

    async createList() {
        let listaTwok = []
        for (let i = 0; i < 9; i++) {
            //console.log('faccio la richiesta numero: ' + i)
            await CommunicationController.getTwok(sid)
            .then(result => {
                //console.log('ho il risultato: ' + result.pversion)
                //let twok = new Twok(result.uid, result.name, result.pversion, result.tid, result.text)
<<<<<<< Updated upstream
                this.handleStoreUserPicture(sid, result.uid)
=======
                this.handleStoreUserPicture2(sid, result.uid, result.pversion, result.name)
>>>>>>> Stashed changes

            listaTwok.push(result)})
            .catch(error => console.log('Error in createList: ' + i + error)) 
            //console.log('iterazione: ' + i + lista)
        }

        //console.log(listaTwok)

        return listaTwok
    }

    async addTwok(lista){
        console.log(lista.length)
        for(let i = 0; i < 3; i++)[
            await CommunicationController.getTwok(sid)
            .then(result => {
<<<<<<< Updated upstream
                this.handleStoreUserPicture(sid, result.uid)
=======
                this.handleStoreUserPicture2(sid, result.uid, result.pversion, result.name)
>>>>>>> Stashed changes
                lista.push(result);
            }).catch(error => console.log('Error in addTwok: ') + error)
        ]

        return lista
    }

}