import { crudThumbnail } from './CRUDThumbnail.js';

const NOM_LOCAL_STORAGE = "taskToDo"

class GestionLocalStorage{
    constructor(){
        this.listOfTask = [];
    }

    getLocalStorage(){
        if(localStorage.getItem(NOM_LOCAL_STORAGE, this.listOfTask) != null){
            this.listOfTask = JSON.parse(localStorage.getItem(NOM_LOCAL_STORAGE, this.listOfTask));
            this.publishLocalStorage();
        }
    }

    updateLocalStorage(){
        localStorage.setItem(NOM_LOCAL_STORAGE, JSON.stringify(this.listOfTask));
    }

    publishLocalStorage(){
        for(let i = 0; i < this.listOfTask.length; i++){
            let thumbnail = crudThumbnail.createThumbNail(this.listOfTask[i]);
            crudThumbnail.addOptionDelete(thumbnail);
            crudThumbnail.addOptionEdit(thumbnail);
        }
    }
}

export let gestionLocalStorage = new GestionLocalStorage();