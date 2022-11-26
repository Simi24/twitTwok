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

    

    async createList() {
        let listaTwok = []
        for (let i = 0; i < 9; i++) {
            //console.log('faccio la richiesta numero: ' + i)
            await CommunicationController.getTwok(sid)
            .then(result => {
                //console.log('ho il risultato: ' + result.pversion)
                //let twok = new Twok(result.uid, result.name, result.pversion, result.tid, result.text)
                this.handleStoreUserPicture2(sid, result.uid, result.pversion, result.name)

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
                this.handleStoreUserPicture2(sid, result.uid, result.pversion, result.name)
                lista.push(result);
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
