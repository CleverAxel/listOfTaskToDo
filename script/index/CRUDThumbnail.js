import { gestionLocalStorage } from './gestionLocalStorage.js';

const TITLE = document.getElementById("titre");
const DESCRIPTION = document.getElementById("description");
const SUBMIT = document.getElementById("submitRequest");

const CONTAIN_TO_DO = document.getElementById("containToDo");

const SAVE_MODIF = document.getElementById("save");
const CANCEL_MODIF = document.getElementById("cancel");
const EDIT_MENU = document.querySelector(".editMenu");

const ID_ATTRIBUT_CUSTOM = "id_thumbnail";

const NEW_TITLE = document.getElementById("titleModif");
const NEW_DESCRIPTION = document.getElementById("descriptionModif");


class CRUD_thumbnail{
    constructor(){
        this.positionOfTask = 0;
        this.selectedThumbnail = null;
    }

    initClass(){
        this.submitThumbnail();
        this.saveEdit();
        this.cancelEdit();
    }
    
    submitThumbnail(){
        SUBMIT.addEventListener("click", () =>{
            let newTask = {
                idTask : this.generateNewId(),
                titre : TITLE.value,
                description : DESCRIPTION.value
            }

            gestionLocalStorage.listOfTask.push(newTask);

            //Thumbnail est l'élément dom tout juste créé.
            let thumbnail = this.createThumbNail(newTask);
            this.addOptionDelete(thumbnail);
            this.addOptionEdit(thumbnail);
            TITLE.value = "";
            DESCRIPTION.value = "";

            gestionLocalStorage.updateLocalStorage();
        });
    }

    addOptionDelete(thumbnail){
        const DELETE_THUMBNAIL = thumbnail.querySelector(".delete");
        const ID_THUMBNAIL = thumbnail.getAttribute(ID_ATTRIBUT_CUSTOM);

        DELETE_THUMBNAIL.addEventListener("click", () =>{
            this.positionOfTask = 0;
            while(gestionLocalStorage.listOfTask[this.positionOfTask].idTask != ID_THUMBNAIL){
                this.positionOfTask++;
            }

            gestionLocalStorage.listOfTask.splice(this.positionOfTask, 1);

            CONTAIN_TO_DO.removeChild(thumbnail);
            gestionLocalStorage.updateLocalStorage();
        });
    }

    addOptionEdit(thumbnail){
        const EDIT_THUMBNAIL = thumbnail.querySelector(".edit");
        const ID_THUMBNAIL = thumbnail.getAttribute(ID_ATTRIBUT_CUSTOM);

        EDIT_THUMBNAIL.addEventListener("click", () =>{
            EDIT_MENU.style.display = "flex";

            this.positionOfTask = 0;
            while(gestionLocalStorage.listOfTask[this.positionOfTask].idTask != ID_THUMBNAIL){
                this.positionOfTask++;
            }
            this.selectedThumbnail = thumbnail;
        });
    }

    saveEdit(){
        SAVE_MODIF.addEventListener("click", () =>{
            EDIT_MENU.style.display = "none";
            const UPDATE_TITLE = this.selectedThumbnail.querySelector(".containTitle > h2");
            const UPDATE_DESCRIPTION = this.selectedThumbnail.querySelector(".containDescription > p");

            
            gestionLocalStorage.listOfTask[this.positionOfTask].titre = NEW_TITLE.value;
            UPDATE_TITLE.innerHTML = NEW_TITLE.value;

            gestionLocalStorage.listOfTask[this.positionOfTask].description = NEW_DESCRIPTION.value;
            UPDATE_DESCRIPTION.innerHTML = NEW_DESCRIPTION.value;

            NEW_TITLE.value = "";
            NEW_DESCRIPTION.value = "";
            gestionLocalStorage.updateLocalStorage();
        });
    }

    cancelEdit(){
        CANCEL_MODIF.addEventListener("click", () =>{
            EDIT_MENU.style.display = "none";
            NEW_TITLE.value = "";
            NEW_DESCRIPTION.value = "";
        });
    }

    createThumbNail(taskDetail){
        let mainContainer = document.createElement("div");
        mainContainer.classList.add("toDo");
    
        let attributCustom = document.createAttribute(ID_ATTRIBUT_CUSTOM);
        attributCustom.value = taskDetail.idTask;
        mainContainer.setAttributeNode(attributCustom);
    
        
    
        let TitleContainer = document.createElement("div");
        TitleContainer.classList.add("containTitle");
    
        let title = document.createElement("h2");
        title.innerHTML = taskDetail.titre;
    
        TitleContainer.appendChild(title);
    
        let edit = document.createElement("span");
        edit.classList.add("material-icons", "edit");
        edit.innerHTML = "edit";
    
        TitleContainer.appendChild(edit);
    
        let delete_ = document.createElement("span");
        delete_.classList.add("material-icons", "delete");
        delete_.innerHTML = "delete";
    
        TitleContainer.appendChild(delete_);
    
        mainContainer.appendChild(TitleContainer);
    
        
    
        let descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("containDescription");
    
        let paragraphe = document.createElement("p");
        paragraphe.innerHTML = taskDetail.description;
    
        descriptionContainer.appendChild(paragraphe);
    
        mainContainer.appendChild(descriptionContainer);
    
    
        CONTAIN_TO_DO.appendChild(mainContainer);
        
        return mainContainer;
    }

    //J'utilise la date de la création de la tâche + millisecondes pour créer un ID.
    generateNewId(){
        let date = new Date();
        let id = date.toString();

        id += (date.getMilliseconds()).toString();
        return id;
    }
}

export let crudThumbnail = new CRUD_thumbnail();