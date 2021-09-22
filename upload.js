/**
 * Librairie de gestion d'upload de fichier avec JavaScript
 * Version: 1.0
 * Auteur: Kassoum TRAORE
 * E-mail: shadoworker5.dev@gmail.com
 * Date: 15/06/2020
*/

(function () {
    let send_attemp = 0;
    let file_name_to_upload = "";
    let xhr = create_connexion_to_serveur();

    const drop_zone = {
        applyDrag: function (item) {
            item.addEventListener('dragstart', function (e) {
                e.preventDefault();
                e.dataTransfer.setData('text/plain', 'Texte de transmission');
            }, false);
            item.addEventListener('dragover', function (e) {
                e.preventDefault();
                item.style.borderStyle = "dashed";
            }, false);

            item.addEventListener('dragleave', function (e) {
                e.preventDefault();
                item.style.borderStyle = 'solid';
            }, false);

            item.addEventListener('dragenter', function (e) {
                e.preventDefault();
                item.style.borderStyle = 'dashed';
            }, false);
        },
        applyDrop: function (item) {
            item.addEventListener('drop', function (e) {
                e.preventDefault();
                item.style.borderStyle = 'solid';
                let files = e.dataTransfer.files;
                settings.item_draggable.hasChildNodes() && settings.item_draggable.lastChild.remove();
                settings.file_input.remove()
                analyze_file(files[0]);
                file_name_to_upload = files[0];
            }, false);
        }
    };

    function send_to_server(data) {
        let form_data = new FormData();
        form_data.append('file', data);
        xhr.open(settings.send_method, settings.upload_url);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('Response ' + xhr.responseText);
                } else {
                    console.log('Erreur status: ' + xhr.status);
                }
            }
        }

        xhr.upload.onprogress = function (e) {
            settings.progress_bar.value = e.loaded;
            settings.progress_bar.max = e.total;
        }
        xhr.send(form_data);
    }

    drop_zone.applyDrag(settings.item_draggable);
    drop_zone.applyDrop(settings.item_draggable);

    function create_image(file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let image_element = document.createElement('img');
            image_element.style.width = "200px";
            image_element.style.height = "200px";
            image_element.style.margin = "20px";
            image_element.src = this.result;
            settings.item_draggable.appendChild(image_element);
        }
        reader.readAsDataURL(file);
    }

    function analyze_file(file) {
        let image_type = file.name.split('.');
        image_type = image_type[image_type.length - 1].toLowerCase();

        if (settings.file_type_allow.indexOf(image_type) !== -1) {
            create_image(file);
        } else {
            alert("Veuillez choisir une image de format: " + settings.file_type_allow);
            window.location.reload();
        }
    }

    function create_connexion_to_serveur() {
        let xhr;
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                console.log("Une erreur s'est produit");
            }
        }
        if (!xhr) {
            setTimeout("create_connexion_to_serveur()", 1000);
        } else {
            return xhr;
        }
    }

    settings.file_input.addEventListener('change', function () {
        analyze_file(this.files[0]);
        file_name_to_upload = this.files[0];
        this.remove();
    });

    settings.submit_id.addEventListener('click', function () {
        if (!file_name_to_upload)
            alert('Please choose file');
        else if (send_attemp === 0 && file_name_to_upload)
            send_to_server(file_name_to_upload);
        else {
            alert("Your file is already upload");
            document.querySelector("#btn_submit").setAttribute('disabled', 'disabled');
        }
        send_attemp++;
    });
})();


// echo "# DMZ" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/shadoworker5/DMZ.git
// git push -u origin main
