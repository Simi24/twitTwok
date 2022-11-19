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
    
    async createList() {
        let listaTwok = []
        for (let i = 0; i < 9; i++) {
            //console.log('faccio la richiesta numero: ' + i)
            await CommunicationController.getTwok(sid)
            .then(result => {
                //console.log('ho il risultato: ' + result.tid)
                //let twok = new Twok(result.uid, result.name, result.pversion, result.tid, result.text)
                this.handleStoreUserPicture(sid, result.uid)

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
                this.handleStoreUserPicture(sid, result.uid)
                lista.push(result);
                console.log(lista.length)
            }).catch(error => console.log('Error in addTwok: ') + error)
        ]

        return lista
    }

}