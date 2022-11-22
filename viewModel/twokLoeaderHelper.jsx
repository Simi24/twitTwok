import CommunicationController from "../model/CC";
import Twok from "../model/twok"
import StorageManager from "../model/storeManager";

let sid = null;
StorageManager.getSid()
.then(result => sid = result)

let SM = new StorageManager();

export default class TwokLoaderHelper{

    async handleStoreNewPicture(uid){
        await CommunicationController.getPicture(sid, uid)
                .then(
                    result => {
                        console.log("Prendo l'immagine che non ho", result)
                        SM.storeUserPicture(result.uid, result.pversion, result.name, result.picture,
                            risultatoStorePicture => console.log('Nuovo utente inserito', (risultatoStorePicture.nome), (risultatoStorePicture.uid)),
                            error => console.log('errore in store user picture ',error)
                            )
                    }
                )
    }


    async handleUpdatePicture(uid){
        await CommunicationController.getPicture(sid, uid)
                .then(
                    result => {
                        console.log("Prendo l'immagine che non ho", result)
                        SM.updateUserPicture(result.uid, result.pversion, result.picture,
                            risultatoUpdatePicture => console.log('Nuovo utente inserito', (risultatoUpdatePicture.nome), (risultatoUpdatePicture.uid)),
                            error => console.log('errore in store user picture ',error)
                            )
                    }
                )
    }

    //TODO: controllare anche se il nome utente è stato modificato
    async handleStoreUserPicture2(sid, uid, pversion){
        SM.getUserPicture(uid,
            risultatoGetUserPicture => {console.log('risultato della ricerca nel db: ',(risultatoGetUserPicture)) ; if(risultatoGetUserPicture == 1){
                this.handleStoreNewPicture(uid)
            } else if(pversion > risultatoGetUserPicture.pversion) {
                this.handleUpdatePicture(uid)
            } else {
                console.log('Non dobbiamo aggiornare il db')
            }},
            error => console.log('errore in getUserPicture', error)
            )
    }

    async handleStoreUserPicture(sid, uid){

        
        await CommunicationController.getPicture(sid, uid)
                .then(
                    resultGetPicture => {
                        console.log('Il risultato del getPicture del server', (resultGetPicture.name))
                        SM.getUserPicture(resultGetPicture.uid,
                            risultatoGetPicture => {console.log('il risultato del GetPicture:', risultatoGetPicture); if(risultatoGetPicture == 1){
                                console.log('entro')
                                SM.storeUserPicture(resultGetPicture.uid, resultGetPicture.pversion, resultGetPicture.name, resultGetPicture.picture,
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
    
    async createList() {
        let listaTwok = []
        for (let i = 0; i < 9; i++) {
            //console.log('faccio la richiesta numero: ' + i)
            await CommunicationController.getTwok(sid)
            .then(result => {
                //console.log('ho il risultato: ' + result.tid)
                //let twok = new Twok(result.uid, result.name, result.pversion, result.tid, result.text)
                this.handleStoreUserPicture2(sid, result.uid)

            listaTwok.push(result)})
            .catch(error => console.log('Error in createList: ' + i + error)) 
            //console.log('iterazione: ' + i + lista)
        }

        //console.log(listaTwok)

        return listaTwok
    }

    async addTwok(lista){
        //console.log(lista.length)
        for(let i = 0; i < 3; i++)[
            await CommunicationController.getTwok(sid)
            .then(result => {
                this.handleStoreUserPicture2(sid, result.uid)
                lista.push(result);
                console.log(lista.length)
            }).catch(error => console.log('Error in addTwok: ') + error)
        ]

        return lista
    }

    async getUserTwoks(uid) {
        let listaTwok = []
        for(let i = 0; i < 5; i++){
            await CommunicationController.getTwok(sid, uid)
            .then(result => listaTwok.push(result))
        }
        return listaTwok
    }

    async addUserTwok(uid, lista){
        for(let i = 0; i<3; i++){
            await CommunicationController.getTwok(sid, uid)
            .then(result => lista.push(result))
        }
        return lista
    }

    

}