"use strict";

PluginManager.register("EszSimcraft_pnj", "1.0", {
	"email": "contact@esz-game.org",
	"website": "Esz-Game.org",
	"name": "Esziaprez"
}, "2016-11-25")
/*: 
* @help
* ----■■■■■■■------■■■■■■----■■■■■■■■■■
* ---■■■■■■■■---■■■■■■■■---■■■■■■■■■
* --■■■■-------- -■■■■----■■■■--■■■■
* -■■■■----------■■■■------■■■■--■■■■
* -■■■■-----------■■■■-----■■■■---■■■■                
* -■■■■--------------■■■■--------------■■■■             
* -■■■■■■■■■--------■■■■-----------■■■■
* -■■■■■■■■■------------■■■■--------■■■■ 
* -■■■■------------------------■■■■-------■■■■              
* -■■■■-------------------------■■■■-------■■■■                                                       
* -■■■■-------------■■■■-----■■■■-------■■■■
* --■■■■------------■■■■----■■■■---------■■■■
* ---■■■■■■■■----■■■■■■■■■---■■■■■■■■
* ----■■■■■■■--------■■■■■■-----■■■■■■■■■
*
* -------- ▼ EszSimcraft_collecte.js ▼--------
* Contact : contact[at]esz-game.org
* THE SIMCRAFT SYSTEM => COLLECTE (GATHERING) Based on snowGather plugin
* Script commented in French by Esz and addon by Esz. Enjoy!
* Free to commercial or no commercial
* Credit SnowCrack, Esz, Kadokawa
*-------------------------------------------------------------------------------------
* ============================================================================
* Introduction FR
* ============================================================================
* Salut,
*
* Bienvenue au utilisateur de SimCraft et particulièrement de cette partie
* batisée "Collecte".
*
* Initiallement créé par Sn0wCrack, ce script permet de créer facilement
* des événements pour permettre à votre personnage de collecter des ressources
* en utilisant (ou non) des outils ou ustensils.
*
* En plus de traduire et de commenter integralement le script en Français,
* Esz a ajouté de nombreuses fonctions supplémentaires et rendu le script
* compatible avec plusieurs autres.
* Tout cela en restructurant le code, pour le rendre plus fluide et agréable
* à utiliser.
* Enfin, Esz a travaillé sur l'interface pour la rendre plus "graphique" et
* toujours aussi simple d'utilisation. En créant de nouvelles windows et
* de nouveaux Huds adaptés aux nouvelles fonctionnalités du plugin.
*
* Espérant que ce travail vous permettra de rendre vos jeux RMMV 
* encore plus attractifs et distrayants, je vous souhaite une bonne découvert
* et vous invite à contacter Esz(contact[at]esz-game.org) pour vos questions
* ou suggestions.☺
*
* Si vous utilisez ce script n'oubliez pas de créditer SnowCrack et Esz !
* Et une copie de vos projets serai sympa.
* Je serai ravis de voir vos jeux et de vous donner mon point de vue
* et des conseils encourageants (si possible ♥).
*
*
* ============================================================================
* Parametrage
* ============================================================================
* Dans la Database, dans les commentaire des objets, vous pouvez ajouter des
* balises qui seront reconnues par le system. Certaines sont indispenssable
* au bon fonctionnement du systeme.
*
* Les commentaire concerneuniquement les items ou "objets";
* ni les armes ni les armures.
*
** =============================================================================
*                           PARAMS DE PLUGIN :
* =============================================================================
* ◙
* ◙
* ◙
*
* =============================================================================
*                           USTENCILS DE COLLECTE :
* =============================================================================
* ◙ Les ustencils de collecte sont les outils permettant de recolter des
* ◙ ressources. Par ex.: une pioche, une pelle, une hache...
* ◙ N'oubliez pas il s'agit d'objet et non d'equipement !!!
* ◙ A la diff de la première version, les balises ont été traduite en FR et
* ◙ beaoucoup d'autres ont été ajoutées
*
* 				<Chance de boost collecte:[VALEUR]> ► Facultatif
*
* ◙ Remplacez [VALEUR] par le pourcentage de boost
* ◙ Ce montant defini le pourcentage de boost des collectes réussies.
*
*					<Chance Collecte>
* 					itemId: pourcentage%
* 					</Chance Collecte> ► Indispensable pour fonctionner
*
* ◙ Ces balises définissent les chances de collecter des objets avec l'outil.
* ◙ exemple :
* ◙ <Chance Collecte>
* ◙ 1: 50%
* ◙ 2: 37%
* ◙ </Chance Collecte>
* ◙ Cela signifie que les chances de collecter de l'objet 1 sont de 50% et
* ◙ celles de reussir à collecter de l'objet 2 sont de 37% avec cet outil.
*
* 					<Risque Usure>
* 					itemId: pourcentage%
* 					</Risque Usure> ► Facultatif
*
* ◙ Cette balise définie les chance de reussir la récolte des objets avec cet
* ◙ outil.
* ◙ exemple :
* ◙ <Risque Usure>
* ◙ 1: 50%
* ◙ 2: 37%
* ◙ </Rsique Usure>
* ◙ Cela signifie que les chance de reussir la collecte de l'objet 1 sont de 50%
* ◙ et celle de reussir la collecte de l'objet 2 sont de 37% avec l'outil
*
*===========================================================
* * ♥♥♥♥   REQUIRE REXAL VISUAL EQUIPEMENT
* * ♥♥♥♥   POSES DU CHARACTER(by Esz) (Vraiment époustouflant)
*
* ◙ Pas mal de plugin utilise $gameParty.actor.pose dont RexalVisualEquipment
* ◙ grace à la balise pose vous pouvez definir une pose pour chaque outils.
* ◙ pour que cela ai une réélle utilité vous pouvez soit utiliser la variable
* ◙ comme bon vous semble,
* ◙ soit simplement definir "true" au parametre "ACTIVE POSE"
* ◙ De cette façon le plugin changera automatiquement la pose du character du
* ◙ joueur et l'animera à l'arret pendant une duree spécifique.
* ◙ Cependant pour ne pas créer de bugs et fonctionner correctement le plugin
* ◙ doit être bien paramétré et ceci rend plusieurs balises obligatoires.
*
* 					<Pose Collecte: [VALEUR]> ► Preferable
*
* ◙ Cette balise  definie le nom de la pose
* ◙ par exemple : <Pose Collecte: marche> ou <Pose Collecte: 10> 
* ◙ Vous pouvez définir cette variable come bon vous semble,
* ◙ C'est simplement la valeur que va revétir $gameParty.leader().pose
* ◙ Si la pose n'est pas definir par la balise l'outil utilisera la valeur
* ◙ par defaut defini dans le param "Pose par defaut"
* 
* ◙ Pour définir la duree de l'animation, Vous disposez de 2 options :
* ◙ 
* ◙ L'Option rapide :
* ◙ Vous utilisez une valeur globale definit dans les paramêtre du plugin
* ◙ 	C'est l'option la plus simple et la plus rapide.
* ◙		- Définissez le param "ACTIVE TIMER ANIM" comme false
* ◙ 		sans guillemets ni rien...
* ◙ 	- Définissez le param "Duree Anim par defaut" qui sera la duree(frames)
* ◙ 		utilisée systématiquement.
* ◙ 
* ◙ L'option personnalisable :
* ◙ Vous pouvez définir la valeur par defaut et celle de chaque ustencil avec
* ◙ une balise.
* ◙ C'est un peu plus contraignant mais cela peut être utile. (Déjà pour moi ça l'est)
* ◙		- Définissez le param "ACTIVE TIMER ANIM" comme true
* ◙ 		sans guillemets ni rien...
* ◙ 	- Définissez le param "Duree Anim par defaut" qui sera la duree(frames)
* ◙ 		par defaut utilisée en cas d'absence de la balise.
* ◙		- Utilisez la balise suivante dans les commentaire de l'objet :
*
*					<Duree Pose:[FRAMES]> ► Preferable
*
* ◙ C'est la duree en frames de l'animation liée à l'ustencil
* ◙ Elle comprend aussi d'autres attributs liés aux autres fonctions de ce
* ◙ script mais nous verrons ça...
*
*					<Forme: [POURCENTAGE]> ► Facultatif/forme active
*
* ◙ La FORME est definie par les hp du leader de l'equipe du joueur.
* ◙ Comprenez que lorsque je parle d'impact sur la forme,
* ◙ cela équivaut donc à impact sur les hp de ce personnage.
* ◙ Dans un ustencils de collecte cela defini le pourcentage de modification
* ◙ de l'impact sur la forme qui est, lui, defini dans les notetags
* ◙ des ressources collectables.
* ◙ La valeur peut etre comprise entre 0 (supprime totalement l'impact)
* ◙ à plus de 100 (augmente l'impact)
* ◙ Par exemple :
* ◙ Si la ressource a une valeur de forme (voire plus bas) de 16
* ◙ l'utilisation d'un outil avec une valeur de forme de 50
* ◙ reduira de moitié l'impacte donc : 8
*
*=======================================================
* * ♥♥♥♥   VISUEL DE l'OUTIL(by Esz) (Absolument fabuleux)
*
* ◙ Le son fonctionne à peu de chose près comme la pose en dehors du fait qu'il
* ◙ n'y a pas de temps à mesurer.
* ◙		- En premier lieu définissez le param "ACTIVE SON" comme true
*
* ◙ Pour définir le son, Vous disposez de 2 options :
* ◙ 
* ◙ Vous pouvez définir la valeur par defaut et celle de chaque ustencil avec
* ◙ une balise.
* ◙ 	- Définissez le param "Son par defaut" qui sera la le son par defaut.
* ◙ 		utilisée en cas d'absence de la balise.
* ◙	Si vous souhaitez définir un son spécifique:
* ◙		- Utilisez la balise suivante dans les commentaire de l'objet :
*
*					<Son Collecte:[NOM DU FICHIER SE]> ► Preferable
*
* ◙ C'est la duree en frames de l'animation liée à l'ustencil
* ◙ Elle comprend aussi d'autres attributs liés aux autres fonctions de ce script
* ◙ mais nous verrons ça...
*
* ◙ Il est aussi possible de définir un son lorsque l'objet se brise dans le
* ◙ param "Son Casse par defaut" et avec la balise :
*
*					<Son Casse Collecte:[NOM DU FICHIER SE]> ► Pas indispensable
*
* ◙ Le son lorsqu'il casse
*					<Icon collecte: [ID]> ► Pour le fun
*
* ◙ La balise ci-dessus définie l'icon utilisé pour les message qui n'est pas
* ◙ necessairement l'icone de l'objet par exemple ce peut être la meme icon
* ◙ pour toute les pioches mais chaque pioche differente peut très bien avoir
* ◙ sa propre icone. Si l'icone n'est pas definit alors c'est l'icone de la
* ◙ database qui sera utilisé.
*
* =============================================================================
*                           RESSOURCES COLLECTABLES :
* =============================================================================
* ◙ Les ressources collectables sont les objets pouvant être recolté grâce
* ◙ aux outils de collecte.
* ◙ Par ex.: du bois, de la pierre, de l'or, de fruits...
* ◙ N'oubliez pas il s'agit d'objet et non d'equipement !!!
* ◙ A la diff de la première version, les balises ont été traduite en FR et
* ◙ beaoucoup d'autres ont été ajoutées
*
*					<Minimum Collecte: [VALEUR]> ► Indispensable
*
* ◙ Le nombre minimum de cet objet obtenu en cas de succès de la collecte 
*
*			<Maximum Collecte: [VALEUR]> ► Indispensable
*
* ◙ Le nombre maximum de cet objet obtenu en cas de succès de la collecte 
*=======================================================
* * ♥♥♥♥   TALENT DE COLLECTE(by Esz) (Extraodinairement fantastique)
* ◙
* ◙ Cet ajout aurait pu faire l'objet d'un plugin à lui tout seul !
* ◙ Cependant Collecte n'étant qu'une petite partie d'un système beaoucoup
* ◙ plus large (SimCraft), je me suis dit qu'il valait mieux regrouper le plus
* ◙ possible les composantes.
* ◙ Cet ajout est inspiré de la partie talent du système de Craft de MrTS
* ◙ Dont j'utilise par ailleurs une version personnalisée dans mon systeme.
* ◙ A la diferrence de beacoup de script MrTS_crafting utilise pas des tags
* ◙ mais bel et bien un fichier Json stocké dans data.
*
* ◙ Dont pour modifier tout ça vous devez utiliser le fichier
* ◙ LISEZMOI_CollecteTalent.txt que je vais joindre à ce script
* ◙ car $TalentCollecte.Json est necessaire au fonctionnement et vous
* ◙ Vous aurez besoin de LISEZMOI_CollecteTalent.txt pour le généré
* ◙ Et le modifier facilement.
* ◙ Cet addon ajoute plusieurs compétences de Collecte
* ◙ exemple : Mineur, Bûcheron, pêcheur...
* ◙ Tout est paramétré dans le Json
* ◙ Deux balise peuvent être utiliser dans les item notetag
*
*					<Talent Collecte: [ID]> ► Non négociable!
*
* ◙ ID the la Talent definie dans le Json Lié à l'objet
* ◙ Par defaut il utisera la Talent 0 mais bon c'est pas vraiment
* ◙ pratique.
*
*					<Collecte Niveau: [NIVEAU]> ► Obligatoire
*
* ◙ Niveau requis de la Talent pour pouvoir collecter l'objet
* ◙ Cela defini aussi le nombre de Xp généré pour la Talent
* ◙ Par defaut il utilisera le plugin
*
*					<Forme: [VALEUR]> ► Obligatoire
*
* ◙ HP requis pour pouvoir collecter l'objet et diminué en collectant
*
*					<Collecte Niveau: [NIVEAU]> ► Obligatoire
*
* ◙ Niveau requis de la Talent pour pouvoir collecter l'objet
* ◙ Cela defini aussi le nombre de Xp généré pour la TALENT
* ◙ Par defaut il utilisera le plugin
*
*					<Icon collecte: [ID]> ► Pour le fun
*
* ◙ La balise ci-dessus définie l'icon utilisé pour les message qui n'est pas
* ◙ necessairement l'icone de l'objet par exemple ce peut être la meme icon
* ◙ pour tout les legumes mais une tomate peut très bien avoir
* ◙ sa propre icone. Si l'icone n'est pas definit alors c'est l'icone de la
* ◙ database qui sera utilisé.
* =============================================================================
*                           INVENTORY ADDON
* =============================================================================	
*
* <Repspawn Time: x> - Required if you want respawing events (Requires OrangeTimeSystem)
* Sets how long in hours you want the event to respawn in
*

* ============================================================================
* 
* ============================================================================
* Usage
* ============================================================================
* To call the script, create an event with a plugin command
*		ESZGather  require tools [recieveable item ids] commonEventId this
*
* Replace require tools with true if you want the player to need tools to gather
* items at this event, or false if you don't want them to use any tools on this
* particular event spot.
*
* Recievable item ids is an array that you replace with something like [7,8]
* please note how there are not spaces in this, keep it this way or it will not
* function correctly. This sets the items taht you can get from this event.
*
* commonEventId is the id of the common event you want to run after selecting a tool
* to harvest with. You may ignore this if you don't want to use it.
*
* this is well, always the word this, this is only required if you're using
* a time system.
*
* Repsawning Events:
*
* In order for an event to actually despawn and then respawn after the allotted
* time, you must first create second event page, on this page you just have to
* have the self switch for "A" checked as a condition, leave everything else 
* blank.
*
* @plugindesc Ultime Systeme de collecte de ressource en français.
* @author Sn0wCrack & Esz-Game	
*
* @param  ► REQUIRE FORME (HP) ◄
* @desc Décoratif inutile de remplir
* @default true
*
* @param ACTIVE FORME
* @desc Activé l'impact sur les hp
* @default true
*
* @param Pourcentage Forme Minimum
* @desc Pourcentage minimum de hp à sauvegarder
* @default 20
*
* @param Fatigue par defaut
* @desc Coût par defaut en hp des collectes
* @default 43
*
* @param  ► TEMPS ◄
* @desc Décoratif inutile de remplir
* @default true
*
* @param ACTIVE AUTOEVENT
* @desc Activer auto-modification des evenements de collecte. true = activé, false = désactivé
* @default false
*
* @param ► REQUIRE POIDS (EszSimcraft_Stockage) ◄
* @desc  Décoratif inutile de remplir
* @default
*
* @param ACTIVE POIDS
* @desc Activer le poids(EszSimcraft_stockage).true = activé, false = désactivé
* @default true
*
* @param ► ANIM(RexalVisualEquip) ◄
* @desc Décoratif inutile de remplir
* @default
*
* @param ACTIVE POSE
* @desc Activer l'animation du character. true = activé, false = désactivé
* @default false
*
* @param Pose par defaut
* @desc Nom de la pose par defaut (RexalVisualEquip.js).
* @default 23
*
* @param Duree Anim par defaut
* @desc Durée approximative de l'animation de collecte en frames
* @default 150
*
* @param ACTIVE TIMER ANIM
* @desc Activer le temps d'animation par outil. true = activé, false = désactivé
* @default false
*
* @param ► EFFETS SONORES ◄
* @desc  Décoratif inutile de remplir
* @default
*
* @param ACTIVE SON
* @desc Activer les effets sonores. true = activé, false = désactivé
* @default true
*
* @param Son par defaut
* @desc Nom du fichier SE par defaut (sans l'extension).
* @default Move1
*
* @param ACTIVE TALENT
* @desc Activer le system de talent (voire aide)
* @default false
*
* @param ACTIVE VARIABLE
* @desc Activela variable resultat/raison de l'echec
* 0:ok 1:non/raté 2:non/outil 3:non/forme 4:non/poids 5:ok/poids, 6:non/talent
			this.animCollecte(resultat);
			this.formeCollecte(resultat);
			this.messageResultatCollecte(resultat);
		break;
		
		case 7://Item brisé
* @default true
*
* @param Resultat Variable ID
* @desc Do you want the hand tool to appear first or last in the items list. true = yes, false = no
* @default 1
*
* @param Outil Main Nue ID
* @desc The variable to store the last result in, 0 = success, 1 = failure, 2 = incorrect tools
* @default 43
*/


/*============= >> STORAGE
-----------------------------------------------------------------------------
         ####    ######    ####    #####     ####     ####    ######
        ##	##     ##     ##  ##   ##  ##   ##  ##   ##  ##   ##
         ##        ##     ##  ##   ##  ##   ##  ##   ##       ##
          ###      ##     ##  ##   #####    ######   ## ###   #####
            ##     ##     ##  ##   ##  ##   ##  ##   ##  ##   ##
        ##  ##     ##     ##  ##   ##  ##   ##  ##   ##  ##   ##
         ####      ##      ####    ##  ##   ##  ##    ####    ######
 ------------------------------------------------------------------------------*/
 
var Importer = Importer || {};
Importer.EszSimcraft_pnj = {};
Importer.EszSimcraft_pnj.name = "EszSimcraft pnj";
Importer.EszSimcraft_pnj.version = "2.3.1";
Importer.EszSimcraft_pnj.contact = "contact@esz-game.org";
Importer.EszSimcraft_pnj.website ="Esz-Game.org";
Importer.EszSimcraft_pnj.autor ="Esziaprez based on SnOwCrack gathering";
Importer.EszSimcraft_pnj.since ="2016-11-25";

var ESZ = ESZ || {};
ESZ.Pnj = ESZ.Pnj || {};
ESZ.Pnj.Windows = ESZ.Pnj.Windows || {};
ESZ.Pnj.Scenes = ESZ.Pnj.Scenes || {};
ESZ.Pnj.Parameters = PluginManager.parameters("EszSimcraft_pnj");
ESZ.Pnj.PopEvents = false;

ESZ.Pnj.prototype.besoinsBdd = function(id){
	
	var _besoin = {};
	
	switch(id){
		case 1:
			_besoin.id = 1;
			_besoin.nom = "Dormir";
			_besoin.estBesoin = if(this.actor.hp<this.pourcentage(this.pnj.hp,60))true ::false;
			_besoin.devientPasUrgentImportant = if(this.actor.hp<this.pourcentage(this.pnj.hp,45))true ::false;
			_besoin.devientUrgentPasImportant = if(this.actor.hp<this.pourcentage(this.pnj.hp,25))true ::false;
			_besoin.devientUrgentImportant = if(this.actor.hp<this.pourcentage(this.pnj.hp,5))true ::false;
		default:
			_besoin.id = -1;
			_besoin.condition = false;
		break;
			
	};	
	return _besoin;
};

ESZ.Pnj.prototype.createPnjIA = function(actor,ennemi){
	this.pnj = actor;
	this.ennemi = ennemi;
	this.setAI(1);//1 total, 2 partielle, 0 desactivé 
	this.initializePnjIA;
}

ESZ.Pnj.prototype.initializePnjAI = function(){
	this.enAttente_reflex = [];
	this.enAttente_urgent_important = [];
	this.enAttente_urgent_pasImportant = [];
	this.enAttente_pasUrgent_Important = [];
	this.enAttente_pasUrgent_pasImportant = [];
	this.enCours_reflex = [];
	this.enCours_urgent_important = [];
	this.enCours_urgent_pasImportant = [];
	this.enCours_pasUrgent_Important = [];
	this.enCours_pasUrgent_pasImportant = [];
	this.backupAction = [];
	this.pnjAIdefaut = this.IAdefaut;
	this.updatePnj();
}

ESZ.Pnj.prototype.updatePnj = function(){
	this.verifierBesoins();
	this.verifierEnAttente();
	this.verifierEncours();
};

ESZ.Pnj.prototype.verifierBesoins = function(){
	
	//initialisation de la liste des besoins
	var _nbrBesoins = 0;
	var _compteurId = 0;
	var _id = 1;
	
	while(_compteurId!==-1){
		_compteurId = this.besoinsBdd(_id).id;
		_nbrBesoins++;
		_id++;
	};
	
	//pour chaque besoin
	for(var i=1; i< _nbrBesoins, i++){
		if(this.besoinsBdd(i).estBesoin){
			this.enAttente_pasUrgent_pasImportant.push(this.besoinsBdd(i));
		};
	};
};

ESZ.Pnj.prototype.verifierEnAttente = function(){
	var changement = false;
	//tant qu'il y a eu des changement on repete la vérification
	while(changement == true){
		changement = false;
		//pour chaque niveau de priorité
		for(var j = 1; j <= 4; j++){
			//on verifie pour chaque action si il y a des changement de priorité et on les effectues
			if(j = 1){
				for(var i = 1; i < this.enAttente_pasUrgent_pasImportant.length; i++ ){
					var action = this.enAttente_pasUrgent_pasImportant[i];
					if(action.devientPasUrgentImportant){
						this.enAttente_pasUrgent_important.push(action);
						this.enAttente_pasUrgent_pasImportant.splice(action,1);
						changement = true;
					};
				};
			};
			if(j = 2){
				for(var i = 1; i < this.enAttente_pasUrgent_important.length; i++ ){
					var action = this.enAttente_pasUrgent_important[i];
					if(action.devientPasUrgentImportant){
						this.enAttente_urgent_pasImportant.push(action);
						this.enAttente_pasUrgent_important.splice(action,1);
						changement = true;
					};
				};
			};
			if(j = 3){
				for(var i = 1; i < this.enAttente_urgent_pasImportant.length; i++ ){
					var action = this.enAttente_urgent_pasImportant[i];
					if(action.devientPasUrgentImportant){
						this.enAttente_urgent_important.push(action);
						this.enAttente_urgent_pasImportant.splice(action,1);
						changement = true;
					};
				};
			};
			if(j = 4){
				for(var i = 1; i < this.enAttente_urgent_important.length; i++ ){
					var action = this.enAttente_urgent_important[i];
					if(action.devientPasUrgentImportant){
						this.enAttente_reflex.push(action);
						this.enAttente_urgent_important.splice(action,1);
						changement = true;
					};
				};
			};
		};
	};
};

ESZ.Pnj.prototype.verifierEnCours = function(){
	if(this.pnj.IA == 1){
		if(!this.enCours_reflex.lenght == 0){
			this.effectuer(this.enCours_reflex);
		}else if(!this.enCours_urgent_important.lenght == 0){
			this.effectuer(this.enCours_urgent_important)
		}else if(!this.enCours_urgent_pasImportant.lenght == 0){
			this.effectuer(this.enCours_urgent_pasImportant);
		}else if(!this.enCours_pasUrgent_important.lenght == 0){
			this.effectuer(this.enCours_pasUrgent_important);
		}else if(!this.enCours_pasUrgent_pasImportant.lenght == 0){
			this.effectuer(this.enCours_pasUrgent_pasImportant);
		};
	};
};

ESZ.Pnj.prototype.effectuer = function(tableEncours){
	this.agit = this.agit || {};
	
	if(this.agit == {}){
		var actionId = tableEnCours[0].id;
		this.actionBdd(actionId);
	}else{
		this.stopAgir(this.agit.id);
	};
};

ESZ.Pnj.prototype.agir = function(action){
	
	switch(action){
		case 1: this.dormir();
		break;
		default: 
		break;
	};
};

ESZ.Pnj.prototype.dormir = function(){
	if(this.agit == {}){
		if(this.pnj.lit === []){
			this.dormirDehors();
		}
	}
}

ESZ.Pnj.prototype.dormirDehors = function(){
	this.character
}



ESZ.Pnj.prototype.pourcentage = function(value, rate){
	return value*rate/100;
};

ESZ.Pnj.prototype.setIA = function(valeur){
	
	var resultat = 0;
	
	switch(valeur){
		case 1: resultat = 1;
		break;
		case 2: resultat = 2;
		break;
		case 3: resultat = 3;
		break;
		case "total": resultat = 1;
		break;
		case "partiel": resultat = 2;
		break;
		case "desactive": resultat = 0;
		break;
		default: resultat = 1;
		break;
	};
	
	this.pnj.IA = resultat;
	
};
					
ESZ.Pnj.prototype.verifierAI = function(){
	return this.pnj.IA;
};		
