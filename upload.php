<?php  
    
	if(isset($_FILES['file']) AND $_FILES['file']['error'] == 0){
		//Test si taille raisonnable <=1Mo
		if( $_FILES['file']['size'] <= 1000000){
			$info = pathinfo($_FILES['file']['name']);
			$extension = $info['extension'];
			$extensionok = array('png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF');

			//modification du nom du document					
			$explode = explode('.', $_FILES['file']['name']);	
			$_FILES['file']['name'] = md5(date('YmdHis')).'.'.$explode[1];

			if(in_array($extension,$extensionok)){
				move_uploaded_file($_FILES['file']['tmp_name'], 'files/'.basename($_FILES['file']['name']));
				$nom = $_FILES['file']['name'];
				echo "L’envoi a bien marche. Name: ".$nom;
			}else{
				echo "Veuillez verifier le type de fichier que vous envoyez";
			} 
		}else{
			echo"La taille de votre image trop grande pour etre sauvegarder";
		}
	}else{
        echo 'Vous n\'avez pas envoyer de photo. Erreur: '.$_FILES['file']['error'];
	}