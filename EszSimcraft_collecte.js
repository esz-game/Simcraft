"use strict";

PluginManager.register("EszSimcraft_collecte", "2.3.1", {
	"email": "contact@esz-game.org",
	"website": "Esz-Game.org",
	"name": "Esziaprez based on SnOwCrack gathering"
}, "2016-11-22");

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
* ============================================================================
* Parametrage
* ============================================================================
* Dans la Database, dans les commentaire des objets, vous pouvez ajouter des
* balises qui seront reconnues par le systeme. Certaines sont indispensable
* au bon fonctionnement du systeme.
*
* Les commentaires concernent uniquement les items ou "objets";
* ni les armes ni les armures.
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
*                           EVENEMENTS DE COLLECTE
* =============================================================================	
* ◙ La fonction suivante necéssite d'avoir un script de gestion du temps
* ◙ il fonctionne avec MOG_timeSystem et EszSimcraft_temps.
* ◙ Lorsque le param ACTIVE AUTOEVENT est activé, les interrupteurs locaux
* ◙ de l'evenement de collecte se désactivent et s'activent un par un de façon
* ◙ automatique.
* ◙ De cette manière on peut simuler un systeme de repousse ou de régénération
* ◙ des element de collecte.
* ◙ Vous devez d'abord placer le tag suivant dans le commentaire de l'evenement
*
*					<AutoCollect: [VALEUR]>
*
* ◙ [VALEUR] correspond au nombre d'heure que le systeme va attendre entre
* ◙ chaque réactivation.
* ◙ Les switch s'active dans le sens A=>B=>C=>D et se désactive dans le sens
* ◙ inverse D=>C=>B=>A. Le D devant (à priori) servir à définir quand la
* ◙ collecte est épuisée.
*
* ◙ Exemple d'utilisation :
* ◙ On crée un evenement "rocher" avec le beau character d'un rocher
* ◙ Dans les commentaire de l'evenement on ajoute la balise <autocollecte: 50>
* ◙ Sur la page 1, on met condition Touche action
* ◙ dans le contenu de la page, la commande de plugin
* ◙ dans la page 2, on met condition Touche action et interupteur A, B, C ou D
* ◙ 
* =============================================================================
*                           COMMANDE DE PLUGIN :
* =============================================================================
* ◙ Pour appeler le script, créez un événement avec une commande de plugin
*
*		<Collecte [OUTIL REQUIS] [TABLEAU DES RESSOURCES] [EVNT COMMUN] this>
*
* ◙ [OUTIL REQUIS]:
* ◙ true= menu de choix de l'outil false= outil main par defaut
* ◙ [TABLEAU DES RESSOURCES]:
* ◙ un tableau (entre deux crochet "[]" et séparé par des virgule) definissant 
* ◙ la liste des ressources collectable par leur id dans la base de donnée.
* ◙ [EVNT COMMUN]: 
* ◙ evenement commun appelé après la collecte
* ◙ this n'est requis que si vous utilisez autoevent
*
* ◙ Exemple : <Collecte true [5,3,1] 4 this>
* ◙ Dans cette exemple:
* ◙ - le joueur aura à choisir un outil
* ◙ - la commande appellera une collecte des ressources 5,3,1
* ◙ - à la fin l'evenement commun 4 sera appelé
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
* @param ► TALENT ◄
* @desc  Décoratif inutile de remplir
* @default
*
* @param ACTIVE TALENT
* @desc Activer le system de talent (voire aide). true = activé, false = désactivé
* @default false
*
* @param ► RESULTAT ◄
* @desc  Décoratif inutile de remplir
* @default
*
* @param ACTIVE VARIABLE
* @desc Active la variable resultat/raison de l'echec. true = activé, false = désactivé
* 0:ok 1:non/raté 2:non/outil 3:non/forme 4:non/poids 5:ok/poids, 6:non/talent 7:outil brisé 8:annulé
* @default true
*
* @param Resultat Variable ID
* @desc ID de la variable pour stoquer le resultat
* @default 1
*
* @param Outil Main Nue ID
* @desc ID de l'objet main dans la base de donnée
* @default 43
*
* @param ACTIVE MESSAGE
* @desc Active les message de resultat en fr. true = activé, false = désactivé
* @default true
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
Importer.EszSimcraft_collecte = {};
Importer.EszSimcraft_collecte.name = "EszSimcraft Collecte";
Importer.EszSimcraft_collecte.version = "2.3.1";
Importer.EszSimcraft_collecte.contact = "contact@esz-game.org";
Importer.EszSimcraft_collecte.website ="Esz-Game.org";
Importer.EszSimcraft_collecte.autor ="Esziaprez based on SnOwCrack gathering";
Importer.EszSimcraft_collecte.since ="2016-11-25";
Importer.EszSimcraft_stockage = Importer.EszSimcraft_stockage || {};

var ESZ = ESZ || {};
ESZ.Collecte = ESZ.Collecte || {};
ESZ.Temps = ESZ.Temps || {};
ESZ.Collecte.Windows = ESZ.Collecte.Windows || {};
ESZ.Collecte.Scenes = ESZ.Collecte.Scenes || {};
ESZ.Collecte.Parameters = PluginManager.parameters("EszSimcraft_collecte");
ESZ.Collecte.PopEvents = false;

ESZ.Collecte.TempItems = [];
ESZ.Collecte.TempRecItems = [];
ESZ.Collecte.TempEvent = 0;
ESZ.Collecte.TempCommonEvent = 0;
ESZ.Collecte.WaitingEvents = [];

ESZ.Collecte.forme_active = ESZ.Collecte.forme_active || MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE FORME"]))|| true;
ESZ.Collecte.temps_active = ESZ.Collecte.temps_active || MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE  AUTOEVENT"]))|| false;
var poidsactive = ESZ.Collecte.poids_active || MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE POIDS"]))|| true;

if(Importer.EszSimcraft_stockage.ok == "ok"){
	ESZ.Collecte.poids_active = poidsactive;
}else{
	console.error("Erreur de chargement de ESZSimcraft_stockage");
	console.error(">> Pour utiliser le POIDS, charger et activer le plugin ESZSimcraft_stockage");

}
ESZ.Collecte.talentCollecte_active = ESZ.Collecte.talentCollecte_active || MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE TALENT"]))|| true;
ESZ.Collecte.sonCollecte_active = ESZ.Collecte.sonCollecte_active || MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE SON"]))|| true;
ESZ.Collecte.poseCollecte_active = ESZ.Collecte.poseCollecte_active || MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE POSE"]))|| true;
ESZ.Collecte.timerCollecte_active = ESZ.Collecte.timerCollecte_active || MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE TIMER ANIM"]))|| true;
ESZ.Collecte.stockageVariable_active = ESZ.Collecte.stockageVariable_active ||MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE VARIABLE"]))|| true;
ESZ.Collecte.message_active = ESZ.Collecte.message_active ||MVC.Boolean(String(ESZ.Collecte.Parameters["ACTIVE MESSAGE"]))|| true;


ESZ.Collecte.mainID = Number(ESZ.Collecte.Parameters["Outil Main Nue ID"])||43;
ESZ.Collecte.pourcentageFormeMin = ESZ.Collecte.pourcentageFormeMin || Number(ESZ.Collecte.Parameters["Pourcentage Forme Minimum"])|| 20;
ESZ.Collecte.defautSon = ESZ.Collecte.defautSon || String(ESZ.Collecte.Parameters["Son par defaut"])|| "Equip1";
ESZ.Collecte.defautPose = ESZ.Collecte.defautPose || Number(ESZ.Collecte.Parameters["Pose par defaut"])|| "200";
ESZ.Collecte.variableResultat = ESZ.Collecte.variableResultat || Number(ESZ.Collecte.Parameters["Resultat Variable ID"])|| 1;
ESZ.Collecte.dureeAnim = ESZ.Collecte.dureeAnim || Number(ESZ.Collecte.Parameters["Duree Anim par defaut"])|| 100;
ESZ.Collecte._fatigueDefaut = ESZ.Collecte._fatigueDefaut || Number(ESZ.Collecte.Parameters["Fatigue par defaut"])|| 50;

DataManager.processus_recuperation_Notetags_ESZCollecte = function(group) {
	
	//Liste tags (expressions regulières) Vous pouvez remarquer que j'ai ajouté 6/11 tags
	// J'en détaillerai les usage après
	var note1 = /<(?:CHANCE DE BOOST COLLECTE):[ ](\d+)([%%])>/i;
	var note2 = /<(?:RISQUE USURE [\d+]):[ ](\d+)([%%])>/i;
	var note2_1 = /<(?:RISQUE USURE)>/i;
	var note2_2 = /<\/(?:RISQUE USURE)>/i;
	var note3 = /<(?:CHANCE COLLECTE [\d+]):[ ](\d+)([%%])>/i;
	var note3_1 = /<(?:CHANCE COLLECTE)>/i;
	var note3_2 = /<\/(?:CHANCE COLLECTE)>/i;
	var note4 = /<(?:MIN COLLECTE):[ ](\d+)>/i;
	var note5 = /<(?:MAX COLLECTE):[ ](\d+)>/i;
	var note6 = /<(?:FORME):[ ](\d+)>/i;
	var note7 = /<(?:POIDS):[ ](\d+)>/i;
	var note8 = /<(?:POSE COLLECTE):[ ](\w+)>/i;
	var note9 = /<(?:ICON COLLECTE):[ ](\d+)>/i;
	var note10 = /<(?:SON COLLECTE):[ ](\w+)>/i;
	var note11 = /<(?:MATIERE):[ ](\w+)>/i;
	var note12 = /<(?:TALENT COLLECTE):[ ](\d+)>/i;
	var note13 = /<(?:COLLECTE NIVEAU ):[ ](\d+)>/i;
	var note14 = /<(?:DUREE POSE ):[ ](\d+)>/i;
	var note15 = /<(?:SON CASSE COLLECTE ):[ ](\w+)>/i;
	
	var risqueUsure_balise = false;
	var chanceCollecte_balise = false;
	
	//Verification des tags dans la database on verifie sa presence
	// et on stock la valeur dans une variable  du systeme
	for (var i = 1; i < group.length; i++) {
		
		//preparation des variables
		var obj = group[i];
		obj.collectable = [];
		obj.destructible = [];
		var notedata = obj.note.split(/[\r\n]+/);
		
		
		for (var n = 0; n < notedata.length; n++) {
			var line = notedata[n];
			if (line.match(note1)) {
				obj.harvestChanceBoost = parseFloat(RegExp.$1 * 0.01);
			} 
			else if (line.match(note2_2)) {
				risqueUsure_balise = false;
			}
			else if (line.match(note2_1)) {
				risqueUsure_balise = true;
			}
			else if (risqueUsure_balise) {
				var data = line.split(": ");
				if (data[1])
					data[1] = data[1].replace("%", "");
				obj.destructible.push({itemId: Number(data[0]), risqueUsure: parseFloat(Number(data[1]) * 0.01)});
			}
			else if (line.match(note3_2)) {
				chanceCollecte_balise = false;
			}
			else if (line.match(note3_1)) {
				chanceCollecte_balise = true;
			}
			else if (chanceCollecte_balise) {
				var data = line.split(": ");
				if (data[1])
					data[1] = data[1].replace("%", "");
				obj.collectable.push({itemId: Number(data[0]), chanceCollecte: parseFloat(Number(data[1]) * 0.01)});
			}
			else if (line.match(note4)) {
				obj.collecteMin = parseInt(RegExp.$1);
			}
			else if (line.match(note5)) {
				obj.collecteMax = parseInt(RegExp.$1);
			}
			else if (line.match(note6)) {
				obj.forme = parseInt(RegExp.$1);
			}
			else if (line.match(note7)) {
				obj.poids = parseInt(RegExp.$1);
			}
			else if (line.match(note8)) {
				obj.collectePose = String(RegExp.$1);
			}
			else if (line.match(note9)) {
				obj.collecteIcon = parseInt(RegExp.$1);
			}
			else if (line.match(note10)) {
				obj.collecteSon = String(RegExp.$1);
			}
			else if (line.match(note11)) {
				obj.matiere = String(RegExp.$1);
			}
			else if (line.match(note12)) {
				obj.diciplineCollecte = parseInt(RegExp.$1);
			}
			else if (line.match(note13)) {
				obj.niveauCollecte = parseInt(RegExp.$1);
			}
			else if (line.match(note14)) {
				obj.dureePose = parseInt(RegExp.$1);
			}
			else if (line.match(note15)) {
				obj.sonBrisee = RegExp.$1;
			}
		}
	}
};


if(ESZ.Collecte.defautPose< 10 || ESZ.Collecte.defautPose> 10000){
	ESZ.Collecte.defautPose= 100;
}
	
var _ESZGame_System_Initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_ESZGame_System_Initialize.call(this);
	//this.initializeEszPopUp();
	if(this.talentCollecte_active){
		this.initializeCollectetalent();
	}
};

Game_System.prototype.initializeCollecteTalent = function() {
	for (var i = 0; i < $dataTalentsCollecte.length; i++) {
		if (!$dataTalentsCollecte[i]) continue;

		var data = $dataTalentsCOllecte[i];
		var id = data["Id"];
		var nom = data["Nom"];
		var iconId = data["IconID"];
		var bckg = data["Background"];

		this.addCollecteTalent(id, nom, iconId, bckg);
	}
};

Game_System.prototype.addCollecteTalent = function(id, nom, iconId, background) {
	var newTalent = {};
	newTalent.Id = id;
	newTalent.Nom = nom;
	newTalent.IconId = iconId;
	newTalent.Background = background;
	newTalent.Xp = [0];
	newTalent.Level = [1];
	this._collecteTalents[id] = newTalent;
};

Game_System.prototype.getCollecteTalent = function(id) {
	return this._collecteTalents[id];
};

Game_System.prototype.gainCollecteExp = function(id) {
	var _talent = this.getCollecteTalent(id);
	var niveau = _talent.Level;
	var _exp = $gameSystem.levelExpCollecte(niveau);
	_talent.Xp += _exp;

	this.verifierTalentLevelUp(id);
};

Game_System.prototype.verifierTalentLevelUp = function(id) {
	var _talent = this.getTalent(id);
	var _niveau = _talent.Level;
	var _seuil = this.seuilNiveauCollecte(niveau);
	if (_niveau >= _seuil && _talent.Level < 20){
		_talent.Xp -=  _seuil;
		_talent.Level++;
	};
};

Game_System.prototype.levelExpCollecte = function (niveau){
	return Math.floor(this.seuilNiveauCollecte(niveau)/15);
};

Game_System.prototype.seuilNiveauCollecte = function(niveau){
	return Math.floor(niveau * 12 + 20 - niveau);
};

ESZ.Collecte.idIntoItem = function(id) {
	return $dataItems[id];
}


//Au chargement !		 
ESZ.Collecte.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!ESZ.Collecte.DataManager_isDatabaseLoaded.call(this)) {
		return false;
	}
	this.processus_recuperation_Notetags_ESZCollecte($dataItems);
	return true;
};

// Sauvegarde
var ESZ_Collecte_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    contents = ESZ_Collecte_DataManager_makeSaveContents.call(this);
    contents.Collecter = ESZ.Collecte.evenement_en_attente;
    return contents;
}
// Chargement
var ESZ_Collecte_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    ESZ_Collecte_DataManager_extractSaveContents.call(this, contents);
    ESZ.Collecte.WaitingEvents = contents.Collecteing;
}

//Mise à jour du system de recolte
ESZ.Collecte.update = function(){
	if(this.timeSystem_enabled){
		ESZ.Collecte.refresh_collecte();
	}
}

//Refresh toutes les heures
ESZ.Collecte.refresh_collecte = function(){
	console.log("1 Heure Passe...");	
	// pourchaque evenement stoqué dans le tableau d'attente
	for (var i = 0; i < this.evenement_en_attente.length(); i++) {
		
		//on reduit l'attente de l'event de 1
		this.evenement_en_attente[i].tempsRestant -= 1;
		var _mapEvent = this.evenement_en_attente[i].mapId; // id de la map de l'event
		var _tempsRestant = this.evenement_en_attente[i].tempsRestant; // temps d'attente restant de l'event
		
		//Si on est sur la map de l'vent et que sont temps d'attente est tombé à zero
		if($gameMap.mapId() == _mapEvent && _tempsRestant <= 0) {
			// on stock l'id de l'event sur la map
			var _eventId = this.evenement_en_attente[i].eventData.id;
			//on appelle la verification des switch
			this.processus_desactivation($gameMap.mapId(), _eventId, i);
			//on bazarde l'event de la liste d'attente
			
		};
	};
};

//Pour générer des valeures aléatoires entre deux nombres (lancé de dé lol)
// La fonction Math.random bien utilisée
ESZ.Collecte.aleatoireRange = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Pour générer des valeures arondie à la valeur la plus proche
// La fonction Math.round avec des decimals et tout et tout on s'en f... :-O
ESZ.Collecte.arrondi = function(value, decimals) {
	return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

 /* ============= >> INTERFACE
 ------------------------------------------------------------------------------

      ##  ##  ## ####### ######  #####   #####   ##     ####   ######
      ##  ### ##   ##    ##      ##  ##  ##     ####   ##  ##  ##
      ##  ### ##   ##    ##      ##  ##  ##    ##  ##  ##      ##
	  ##  ## ###   ##    ####    #####   ####  ##  ##  ##      ####
      ##  ##  ##   ##    ##      ##  ##  ##    ######  ##      ##
      ##  ##  ##   ##    ##      ##  ##  ##    ##  ##  ##  ##  ##
      ##  ##  ##   ##    ######  ##  ##  ##    ##  ##   ####   ######

 ------------------------------------------------------------------------------*/
 
function Outil_Hud(){
    this.initialize.apply(this, arguments);
}

Outil_Hud.prototype = Object.create(Window_ItemList.prototype);
Outil_Hud.prototype.constructor = Outil_Hud;

Outil_Hud.prototype.initialize = function(x, y, width, height) {
	Window_ItemList.prototype.initialize.call(this, x, y, width, height);
	this._data = [];
	this.activate();
	this.refresh();
    this.select(0);
}

Outil_Hud.prototype.isEnabled = function(item) {
    return true;
}

Outil_Hud.prototype.maxCols = function() {
    return 1;
};

Outil_Hud.prototype.makeItemList = function() {
	this._data = ESZ.Collecte.TempOutilsAccessibles;
}

Outil_Hud.prototype.drawItemNumber = function(item, x, y, width) {
	if (this.needsNumber() && item.id != ESZ.Collecte.mainID) {
        this.drawText(':', x, y, width - this.textWidth('00'), 'right');
        this.drawText($gameParty.numItems(item), x, y, width, 'right');
    }
}

var ItemChoiceHelpWindow = function() {
	this.initialize.apply(this, arguments);
}

ItemChoiceHelpWindow.prototype = Object.create(Window_Help.prototype);
ItemChoiceHelpWindow.prototype.constructor = ItemChoiceHelpWindow;

ItemChoiceHelpWindow.prototype.initialize = function(numLines) {
	Window_Help.prototype.initialize.call(this, numLines);
}	

ESZ.Collecte.Windows.ItemChoiceHelpWindow = ItemChoiceHelpWindow;

/*============= >> SCENE
-----------------------------------------------------------------------------

         ####     ####    ######   ##  ##   ######
        ##	##   ##  ##   ##       ### ##   ##
         ##      ##       ##       ### ##   ##
          ###    ##       #####    ## ###   #####
            ##   ##       ##       ##  ##   ##
        ##  ##   ##  ##   ##       ##  ##   ##
         ####     ####    ######   ##  ##   ######
 
 ------------------------------------------------------------------------------*/

var ChoixOutils = function() {
	this.initialize.apply(this, arguments);
}

ChoixOutils.prototype = Object.create(Scene_ItemBase.prototype);
ChoixOutils.prototype.constructor = ChoixOutils;

ChoixOutils.prototype.initialize = function(data) {
	Scene_ItemBase.prototype.initialize.call(this);
}

ChoixOutils.prototype.create = function() {
	Scene_ItemBase.prototype.create.call(this);
	this._createItemChoiceHelpWindow();
	this._createItemChoiceWindow();
}

ChoixOutils.prototype.start = function() {
	 Scene_ItemBase.prototype.start.call(this);
}

ChoixOutils.prototype._createItemChoiceWindow = function() {
	this._choixOutilHud = new Outil_Hud(0, this._itemChoiceHelpWindow.height, 300, Graphics.boxHeight - this._itemChoiceHelpWindow.height+300);
	this._choixOutilHud.setHandler('ok', this._onItemChoiceWindowOK.bind(this));
	this._choixOutilHud.setHandler('cancel', this._onItemChoiceWindowCancel.bind(this));
	this.addWindow(this._choixOutilHud);
}

ChoixOutils.prototype._createItemChoiceHelpWindow = function() {
	this._itemChoiceHelpWindow = new ESZ.Collecte.Windows.ItemChoiceHelpWindow(1);
	this._itemChoiceHelpWindow.setText("Choisissez l'outil que vous souhaitez utiliser : ");
	this.addWindow(this._itemChoiceHelpWindow);
}

ChoixOutils.prototype._onItemChoiceWindowOK = function() {
	var selected = this._choixOutilHud.item();
	console.log("on choisit l'outis");
	
	ESZ.Collecte.outilChoisit(selected, ESZ.Collecte.table_ObjetsRecuperables, ESZ.Collecte.TempEvent, ESZ.Collecte.TempCommonEvent);
	this.popScene();
}

ChoixOutils.prototype._onItemChoiceWindowCancel = function() {
	if(this.stockageVariable_active){
		$gameVariables.setValue(this.variableResultat,8)
	};
	this.popScene();
}

ESZ.Collecte.Scenes.ChoixOutils = ChoixOutils;

/* ============= >> CALCUL
-----------------------------------------------------------------------------

      ####     ##    ##      ####   ##  ##  ##
     ##  ##   ####   ##     ##  ##  ##  ##  ##      
     ##      ##  ##  ##     ##      ##  ##  ##
     ##      ##  ##  ##     ##      ##  ##  ## 
	 ##      ######  ##     ##      ##  ##  ## 
     ##  ##  ##  ##  ##     ##  ##  ##  ##  ##        
      ####   ##  ##  #####   ####    ####   ###### 
 
 ------------------------------------------------------------------------------*/

//Cette fonction est la première initiée par le gather Elle test si les outils sont
//Suffisant pour gather
ESZ.Collecte.collecter = function(outilEstRequit, objetsRecevables, commonEvent, eventData) {
	
	this.outil_main_nue = this.idIntoItem(this.mainID);
	
	console.log("On commence avec "+this.outil_main_nue.name );
	console.log("Il y a a recuperer");
	console.log(objetsRecevables[0]);
	
	console.log("On met l'evenement en commun en attente");
	//On met l'evenemtn en commeun en attente
	if (commonEvent > 0)  {
		$gameTemp.reserveCommonEvent(commonEvent);
	};
	
	console.log("L'outils est-il requis dans la commande de plugin");
	//===================  Si l'outils n'est pas requit dans la commande de plugin
	if (!outilEstRequit) {
		console.log("Aucun outil n'est requis");
		//On prepare un tableau pour mettre la liste des objets à récupérer
		var table_ObjetsRecuperables = this.getTableRecevable(objetsRecevables);
		var resutat_Collecte = [];//pour me rappeler que c'est un tableau
		var resutat_Collecte = this.Test1(table_OjetRecuperables, this.outil_main_nue);
		
		//Pour chaque résultat
		for(i=0; i <= resutat_Collecte.lenght; i++ ){
			this.resolutionCollecte(resutat_Collecte[i],this.outil_main_nue, eventData);
		}
	
	//================== Si l'outils est requit dans la commande de plugin
	}else{
		
		console.log("Un outil est requis");
		//On prepare les variable pour l'outils du joueur
		ESZ.Collecte.TempOutilsAccessibles = ESZ.Collecte.TempOutilsAccessibles ||[];
		//On prepare un tableau pour mettre la liste des objets à récupérer
		ESZ.Collecte.table_ObjetsRecuperables = this.getTableRecevable(objetsRecevables);
		console.log(ESZ.Collecte.table_ObjetsRecuperables[0]);
		
		//Par defaut j'ai mis la main en dernier
		//Donc pour chaque objet récupérable
		for (var j = 0; j < ESZ.Collecte.table_ObjetsRecuperables.length; j++) {
			var _main = this.outil_main_nue;
			console.log(_main.name);
			//Pour chaque chance de collecte de la main
			for (var k = 0; k < _main.collectable.length; k++) {
				console.log("COLLECTABLE ");
				console.log(_main.collectable[k]);
				console.log("RECUPERABLE ");
				console.log(ESZ.Collecte.table_ObjetsRecuperables[j]);
				//Si elle corespond à un l'objet recupérable désigné
				if (_main.collectable[k].itemId == ESZ.Collecte.table_ObjetsRecuperables[j].id) {
					//si l'outils ne figure pas dans la liste des outils utilisables
					console.log("L'OBJET A DES CHANCE RECUPERER LA RESSOURCE");
					if (!ESZ.Collecte.TempOutilsAccessibles.contains(_main)) {
						//on l'y ajoute
						console.log("ON L'AJOUTE A LA TABLE DES OUTILS POTENTIELS");
						ESZ.Collecte.TempOutilsAccessibles.push(_main);
						console.log(ESZ.Collecte.TempOutilsAccessibles[0]);
						console.log("=====================================");
					}
				}
			}
		};
		
		var inventaireJoueur = $gameParty.items();
		console.log("Maintenant on fait la meme avec les autre outils de l'inventaire du joueur");
		//Pour chaque item
		console.log("Il y en a "+inventaireJoueur.length+" a tester");
		for (var i = 0; i < inventaireJoueur.length; i++) {
			
			//Si il ya une ou plusieurs valeures de chance de collecte
			
			if (inventaireJoueur[i].collectable !== []) {
			
				//Pour chaque objet récupérable
				for (var j = 0; j < this.table_ObjetsRecuperables.length; j++) {
					
					//Pour chaque chance de collecte
					for (var k = 0; k < inventaireJoueur[i].collectable.length; k++) {
						//Si elle corespond à un l'objet recupérable désigné
						if (inventaireJoueur[i].collectable[k].itemId == this.table_ObjetsRecuperables[j].id) {
							console.log("Inventaire Chance de collecte"+ inventaireJoueur[i].collectable[k].chanceCollecte );
							//si l'outils ne figure pas dans la liste des outils utilisables
							if (!this.TempOutilsAccessibles.contains(inventaireJoueur[i])) {
								//on l'y ajoute
								this.TempOutilsAccessibles.push(inventaireJoueur[i]);
							};
						};
					};
				};
			};
		};
		
		
		//Si aucun outil n'est utilisable	
		if (ESZ.Collecte.TempOutilsAccessibles.length == 0) {
			this.resolutionCollecte([2,0,0,0,eventData]);
		}else{
			console.log("TEMP =========> Outils utilisables : ");
			console.log(this.TempOutilsAccessibles[0]);
			console.log("TEMP =========> Ressources collectables : ");
			console.log(this.table_ObjetsRecuperables[0]);
			this.TempEvent = eventData;
			this.TempCommonEvent = commonEvent;
			console.log("LES EVENTS");
			console.log(this.TempEvent);
			console.log(this.TempCommonEvent);
			
			console.log("!!!!!!!!!!!!! SCENE DU CHOIX DE L'OUTIL");
			SceneManager.push(this.Scenes.ChoixOutils);
		}
	};
	
};	
ESZ.Collecte.outilChoisit = function (choisit, objetsRecevables, TempEvent, TempCommonEvent, eventData){
	 	
		var resultat_Collecte = this.testGlobal(objetsRecevables, choisit, eventData);
		
		console.log("on appelle le resultat");
		console.log(resultat_Collecte[0]);
		console.log("pour");
		console.log(resultat_Collecte);
		//Pour chaque résultat
		for(var i=0; i < resultat_Collecte.length; i++){
			
			console.log(resultat_Collecte[i]);
			this.resolutionCollecte(resultat_Collecte[i]);
		};
	
 };
ESZ.Collecte.testGlobal = function(recevablesData, _outil, eventData){
	
	console.log("Pour chaque element dans la table des objet récupérable");
	//Pour chaque element dans la table des objet récupérable
	for (var i = 0; i < recevablesData.length; i++) {
		
		console.log("on génére une variable aléatoire pour tester la réussite et on récupère le data de l'objet main nue");
		var _aleatoire = this.arrondi(Math.random(), 2);
		var outilDetruit = false;
		
		console.log("Pour chaque collectable dans le tag chance de collecte de l'outil main");
		for (var j = 0; j < 1; j++) {
			
			console.log("Si l'objet fait partie des objets récupérables");
			if (_outil.collectable[j].Id == recevablesData.itemId){
				
				console.log("On défini les variable test");
				var _actor = $gameParty.leader();
				var _objetRecevable = recevablesData[i];
				var _resultatCollecte = 0;
				var _quantiteCollectee = this.aleatoireRange(_objetRecevable.collecteMin, _objetRecevable.collecteMax);
				var retour = [];
				
				
				console.log("TEST 1 -  On verifie les hp (forme suffisante)");
				if(!this.forme_active || this.testForme(_actor, _objetRecevable, _outil)){
					
					console.log("TEST 2 - TALENT");
					console.log("On defini les chance de reussite avec la compétence si il y a lieu.");
					if(!this.talent_active || this.testTalent(_objetRecevable)){
						
						console.log("TEST 3 - USURE OUTIL");
						console.log("Si il y a un potentiel de destruction defini de l'outil");
						if (_outil.risqueUsure !== undefined) {
							console.log("Pour chaque potentiel de destruction defini dans l'outil");
							for (var j = 0; j < _outil.destructible[j].length; j++) {
								console.log("Si le risque d'usure correspond à l'objet");
								if (_outil.destructible[j].itemId == _objetRecevable.id) {
									console.log("et on lance le dé...");
									var _aleaCasse = ESZ.Collecte.arrondi(Math.random(), 2);
									if (_outil.destructible[j].risqueUsure >= _aleaCasse && !outilDetruit) {
										outilDetruit = true;
									};
								};
							};
						};

						if(!outilDetruit){
							var _chance_ReussiteCollecte = _outil.collectable[j].chanceCollecte;
							console.log("TEST 4 -  On verifie la chance de reussite");
							if(_aleatoire <= _chance_ReussiteCollecte){
								
								console.log("TEST 5 - On verifie le poids supportable");
								if(!this.poids_active || this.testPoids(_objetRecevable, _quantiteCollectee)){
									retour.push([0,_quantiteCollectee, _objetRecevable,_outil]);//reussite
								}else{
									var _quantiteTolerable = this.ajusterPoids(_objetRecevable,_quantiteCollectee);
									if(_quantiteTolerable > 0){
										retour.push([5,_quantiteTolerable,_objetRecevable,_outil,eventData]);//reussite poids max
									}else{
										retour.push([4,0,_objetRecevable,_outil,eventData]);//poids trop important
									};
								};
							}else{
								retour.push([1,0,_objetRecevable,_outil,eventData]);// echec de la collecte
							};
						}else{
							retour.push([7,0,_objetRecevable,_outil,eventData]);
						}
					}else{
						retour.push([6,0,_objetRecevable,_outil,eventData]);// echec niveau talent
					}
				}else{
					retour.push([3,0,_objetRecevable,_outil,eventData]);//forme insuffisante
				};
			};
		};
	};
	return retour;
};
ESZ.Collecte.resolutionCollecte = function (resultat){

	console.log("le resultat est" + resultat[0]);
	switch(resultat[0]){
		
		case 0://succes
			this.animCollecte(resultat);
			this.inventaireCollecte(resultat);
			this.formeCollecte(resultat);
			this.attenteAnim(resultat);
			this.messageResultatCollecte(resultat);
			this.autoEvent(resultat);
		break;
		
		case 1://echec
			this.animCollecte(resultat);
			this.formeCollecte(resultat);
			this.attenteAnim(resultat);
			this.messageResultatCollecte(resultat);
		break;
		
		case 2://outil
			this.messageResultatCollecte(resultat);
		break;
		
		case 3://Forme insufisante
			this.messageResultatCollecte(resultat);
		break;
		
		case 4://poids
			this.messageResultatCollecte(resultat);
		break;
		
		case 5://ok mais poids
			this.animCollecte(resultat);
			this.inventaireCollecte(resultat);
			this.formeCollecte(resultat);
			this.attenteAnim(resultat);
			this.messageResultatCollecte(resultat);
			this.autoEvent(resultat);
		break;
		
		case 6://talent
			this.animCollecte(resultat);
			this.formeCollecte(resultat);
			this.attenteAnim(resultat);
			this.messageResultatCollecte(resultat);
		break;
		
		case 7://Item brisé
			this.animCollecte(resultat);
			this.attenteAnim(resultat);
			this.animCollecteCassee(resultat);
			$gameParty.loseItem(resultat[3].id, 1);
			this.messageResultatCollecte(resultat);
		break;
		
		default:
			console.log("BUGG base");
	};

	if(this.stockageVariable_active){
		$gameVariables.setValue(this.variableResultat,resultat[0])
	};
};
ESZ.Collecte.autoEvent = function(resultat){
	if (this.temps_active) {
		var _eventId = resultat[4].id;
		var _mapId = $gameMap.mapId();
		this.evenement_en_attente = this.evenement_en_attente ||{};
		this.evenement_en_attente.push({
			mapId: _mapId,
			eventData: $dataMap.events[eventId], 
			tempsRestant: Number($dataMap.events[eventId].meta["AutoCollecte"])
		});
		this.processus_activation($gameMap.mapId(), resultat[4]);
	
	};
}
/* ↓↓↓↓↓↓↓↓↓↓↓↓  ESZ ADD ON PROGRESSIVE SWITCH DESACTIVATION   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/
ESZ.Collecte.processus_desactivation = function(mapId, eventData, attenteId){
	
	var _lien_self_switch = [$gameMap.mapId(), eventId, "D"];
	var _valeur_switch = $gameSelfSwitches.value(_lien_self_switch);
	
	if(_valeur_switch){
		$gameSelfSwitches.setValue(_lien_self_switch, false);
	}else{
		var _lien_self_switch = [$gameMap.mapId(), event_mapID, "C"];
		var _valeur_switch = $gameSelfSwitches.value(_lien_self_switch);
		if(_valeur_switch){
			$gameSelfSwitches.setValue(_lien_self_switch, false);
		}else{
			var _lien_self_switch = [$gameMap.mapId(), event_mapID, "B"];
			var _valeur_switch = $gameSelfSwitches.value(_lien_self_switch);
			if(_valeur_switch){
				$gameSelfSwitches.setValue(_lien_self_switch, false);
			}else{
				var _lien_self_switch = [$gameMap.mapId(), event_mapID, "A"];
				var _valeur_switch = $gameSelfSwitches.value(_lien_self_switch);
				if(_valeur_switch){
					$gameSelfSwitches.setValue(_lien_self_switch, false);
					this.evenement_en_attente.splice(attenteId, 1);
				};
			};
		};
	};
};
ESZ.Collecte.processus_activation = function(mapId, eventData){
	
	var _lien_self_switch = [mapId, eventId, "A"];
	var _valeur_switch = $gameSelfSwitches.value(_lien_self_switch);
	if(!_valeur_switch){
		$gameSelfSwitches.setValue(_lien_self_switch, true);
	}else{
		var _lien_self_switch = [$gameMap.mapId(), event_mapID, "B"];
		var _valeur_switch = $gameSelfSwitches.value(_lien_self_switch);
		if(!_valeur_switch){
			$gameSelfSwitches.setValue(_lien_self_switch, true);
		}else{
			var _lien_self_switch = [$gameMap.mapId(), event_mapID, "C"];
			var _valeur_switch = $gameSelfSwitches.value(_lien_self_switch);
			if(!_valeur_switch){
				$gameSelfSwitches.setValue(_lien_self_switch, true);
			}else{
				var _lien_self_switch = [$gameMap.mapId(), event_mapID, "D"];
				var _valeur_switch = $gameSelfSwitches.value(_lien_self_switch);
				if(!_valeur_switch){
					$gameSelfSwitches.setValue(_lien_self_switch, true);
				};
			};
		};
	};
};
ESZ.Collecte.getTableRecevable = function(recevables){
	 var resultat = [];
	 //Pour chaque objet
	for (var i = 0; i < recevables.length; i++) {
		
		//On ajoute l'objet et ses datas dans la table des objets récupérable au même index unique
		var _objetID =  Number(recevables[i]);
		resultat[i] = this.idIntoItem(_objetID);
	}
	return resultat;
}
ESZ.Collecte.messageResultatCollecte = function(resultat){
	if(this.message_active){
		var _outil = resultat[3];
		var _objet = resultat[2];
		var _quantite = resultat[1];
		var _actor = $gameParty.leader();
		
		switch(resultat[0]){
			
			case 0://succes
				$gameMessage.add("\\{\\c[1] REUSSITE DE LA COLLECTE");
				$gameMessage.add("\\}\\i[" + String(_outil.collecteIcon) + "] \\c[4]"+_outil.name.toUpperCase()+" \\c[3]\\i[" + String(_objet.collecteIcon)+ "] " + _objet.name + " \\}\\c[11]x" + String(_quantite) );
				$gameMessage.add("\\}\\i[432] \\{\\c[4]FORME:\\} \\c[2]Cons.:\\{\\c[10]-" + String(_objet.forme)+ "\\c[2]\\}/" + String(_actor.hp + _objet.forme) + "\\c[4] /\\c[3] Rest.:\\{\\c[11]" + String(_actor.hp) );			
				
				if(this.discipline_active){
					var _discpline = $gameSystem.getCollecteDiscipline(_objet.disciplineCollecte);
					var _icon = _discpline.Icon;
					var _lvl = _discpline.Level;
					var _Xp = _discpline.Xp;
					var _nextLvl = $gameSystem.seuilNiveauCollecte(_lvl);
					var _nom =_discipline.Nom;
					$gameMessage.add("\\}\\i["+ _icon+"] "+_nom+" \\{\\c[4]Niv:"+_lvl+"\\} \\c[11]Xp.:\\c[3]"+_Xp+"\\c[11]" + _nexetLvl);
				}
			break;
			
			case 1://echec
				$gameMessage.add("\\{\\c[1] ECHEC DE LA COLLECTE");;
				$gameMessage.add("\\}Vous avez échoué votre tentative. Peut-être en utilisant un meilleur outil...");
			break;
			
			case 2://outil
				$gameMessage.add("\\{\\c[1] OBJET NECESSAIRE");
				$gameMessage.add("\\}Vous ne disposez pas de l'outil adéquat!");
			break;
			
			case 3://Forme insufisante
				$gameMessage.add("\\{\\c[1] TROP DE FATIGUE");
				$gameMessage.add("\\}Vous n'avez pas assez d'énergie pour ceci!");
			break;
			
			case 4://poids
				$gameMessage.add("\\{\\c[1] TROP DE POIDS");
				$gameMessage.add("\\}Vous êtestrop charger pour porter plus de \\i["+_objet.collecteIcon+"] "+ _objet.name +"!");
			break;
			
			case 5://ok mais poids
				$gameMessage.add("\\{\\c[1] REUSSITE DE LA COLLECTE !surchargé!");
				$gameMessage.add("\\}\\i[" + String(_outil.collecteIcon) + "] \\c[4]"+_outil.name.toUpperCase()+" \\c[3]\\i[" + String(_objet.collecteIcon)+ "] " + _objet.name + " \\}\\c[11]x" + String(_quantite) );
				$gameMessage.add("\\}\\i[432] \\{\\c[4]FORME:\\} \\c[2]Cons.:\\{\\c[10]-" + String(_objet.forme)+ "\\c[2]\\}/" + String(_actor.hp + _objet.forme) + "\\c[4] /\\c[3] Rest.:\\{\\c[11]" + String(_actor.hp) );			
				
				if(this.discipline_active){
					var _discpline = $gameSystem.getCollecteDiscipline(_objet.disciplineCollecte);
					var _icon = _discpline.Icon;
					var _lvl = _discpline.Level;
					var _Xp = _discpline.Xp;
					var _nextLvl = $gameSystem.seuilNiveauCollecte(_lvl);
					var _nom =_discipline.Nom;
					$gameMessage.add("\\}\\i["+ _icon+"] "+_nom+" \\{\\c[4]Niv:"+_lvl+"\\} \\c[11]Xp.:\\c[3]"+_Xp+"\\c[11]" + _nexetLvl);
				}
			break;
			
			case 6://talent
				$gameMessage.add("\\{\\c[1] TROP DIFFICILE");
				$gameMessage.add("\\}Vous n'avez pas le talent necessaire pour cela!");
				$gameMessage.add("\\}\\i["+ _icon+"] "+_nom+" \\{\\c[4]Niv:"+_lvl+"\\} \\c[11]Xp.:\\c[3]"+_Xp+"\\c[11]" + _nexetLvl);
			break;
			
			case 7://Cassé
				$gameMessage.add("\\{\\c[1] VOTRE " + _outil.name.toUpperCase() + " A ETE DETRUIT");
				$gameMessage.add("\\}Vous avez détruit votre "+_outil.name+" tandis que vous l'utilisiez !");
				$gameMessage.add("\\i["+ _outil.icon+"]\\c[2]"+_outil.name +" \\c[10]-1");
			break;
			
			default:
			console.log("BUGG message");
			break;		
		}
	}else{
		
	}
	
}		
ESZ.Collecte.animCollecte = function(resultat){
	//son
	if(this.sonCollecte_active){
		var _son = this.defautSon;
		if(resultat[3].collecteSon === undefined){
			if(resultat[2].collecteSon === undefined){
				_son = this.defautSon;
			}else{
				_son = String(resultat[2].collecteSon);
			}
		}else{
			_son = String(resultat[3].collecteSon);
		};
		var _sonJoue = {};
		_sonJoue.name = _son;
		_sonJoue.pitch = 100;
		_sonJoue.volume = 100;
		_sonJoue.pan = 0;
		console.log(_sonJoue);
		AudioManager.playSe(_sonJoue);
	};
	//anim
	if(this.poseCollecte_active){
		var _objet = resultat[3];
		var _Pose = String(_objet.collectePose) || this.defautPose;
		$gameSystem.setPose(1,_Pose);
		$gamePlayer.setStepAnime("true");
	};
};
ESZ.Collecte.dureeDePose = function(objet){
	if(!this.timerCollecte_active || objet.dureePose === undefined){
		return this.dureeAnim;
	}else{
		var attente = Number(objet.dureePose) || 100;
		if(attente <100 || attente > 10000){
			attente =100;
		}
		return attente;
	};
};
ESZ.Collecte.animCollecteCasse = function(resultat){
	var _objet = resultat[3];
	if(this.sonCollecte_active){
		var _son = String(_objet.sonBrisee) || this.defautSon;
		var _sonJoue = {};
		_sonJoue.name = _son;
		_sonJoue.pitch = 100;
		_sonJoue.volume = 100;
		_sonJoue.pan = 0;
		AudioManager.playSe(_sonJoue);
	};
	if(this.poseCollecte_active){
		var _Pose = String(_objet.collectePose) || this.defautPose;
		$gameSystem.setPose(1);
		$gamePlayer.setStepAnime("true");
	};
};
ESZ.Collecte.inventaireCollecte = function (resultat){
	console.log("on collecte "+resultat[1]+" "+resultat[2].name);
	var _objet = resultat[2];
	var _quantite = resultat[1];
	$gameParty.gainItem(_objet, _quantite);
}
ESZ.Collecte.formeCollecte = function (resultat){
	var _actor = $gameParty.leader();
	//LE SYSTEME DE FORME EST ACTIF ?
	if(this.forme_active){
		
		console.log("La forme est activé");
		
		var _recevableForme = resultat[2].forme || this._fatigueDefaut;
		var _outilForme = resultat[3].forme || 100;
		if(_outilForme<0){
			_outilForme = 100;
		};
		var _impactForme = Math.floor(_outilForme *_recevableForme/100)*-1;
		
		console.log("Impact sur la forme de la ressource: "+_recevableForme);
		console.log("Modification de l'impact sur la forme par l'outil: "+_outilForme+"%");
		console.log("Modification totale: "+_impactForme);
		//DIMINUTION DES HP
		_actor.gainHp(_impactForme);
		
	//LE SYSTEME DE FORME N'EST PAS ACTIF
	}else if(pose_active){
		var _tempo = this.dureeDePose(resultat[3]);
		var _compteurFrames = 0;
		while(_tempo > _compteurFrames){							
			_compteurFrames++;
		};
	}
}
ESZ.Collecte.testForme =function (actor, recevable, outil){
	var _impactFormeOutil = outil.forme || 100;
	var _impactForme = Math.floor(recevable.forme *_impactFormeOutil/100);
	var _formeMinimum = _impactForme + Math.floor(actor.mhp *this.pourcentageFormeMin/ 100)
	//verification stats
	if (actor.hp >= _formeMinimum){
		return true;
	}else{
		return false;
	};
}
ESZ.Collecte.testTalent =function(objet){
	var _talent = $gameSystem.getCollecteTalent(objet.collecteTalent)||0;
	var _niveau = _talent.Level;
	var _niveauRequis = objet.niveauCollecte;
	if(_niveauRequis > _niveau){
		$gameSystem.gainCollecteExp(_talent.Id)
		return true;
	}else{
		return false;
	};
};
ESZ.Collecte.testPoids = function(objet, quantite){
	console.log("Test de poids *"+quantite);
	if(objet.poids * quantite < $gameParty.getStockageRestant()){
		console.log("Assez *"+quantite);
		return true;
	}else{
		console.log("Torp *"+quantite);
		return false;
	};
};
ESZ.Collecte.attenteAnim = function(resultat){
	var _attente = resultat[3].dureePose||this.dureeAnim;
	var _compteur = 0;
	var _compteurMinute = 0;
	while(_compteur<_attente){
		_compteur++;
		if(this.temps_active){
			_compteurMinute++;
			if(_compteurMinute>this.frameMinute)
			$gameSystem.add_minute(1);
		}
	};
	$gameSystem.setPose(1);
	$gamePlayer.setStepAnime("false");
};
ESZ.Collecte.ajusterPoids = function(objet,quantite){
	var nbrobjets_Counter = quantite;
	//tant qu'il y a au moins un objet à tester
	console.log("Ajuste le poids *"+quantite);
	while(nbrobjets_Counter >0){
		if(this.testPoids(objet,quantite) < $gameParty.getStockageRestant()){
			
			nbrobjets_Counter = 0;//Verification du poids est ok pour tout les objet
			return quantite;
		//si le poids des items est supérieur à la capacité de poids
		}else if (quantite == 0){
			nbrobjets_Counter = 0;//Verification du poids est ok pour tout les objet
			return quantite;
		}else{
			//On diminue le nombre d'item et de verification aussi
			nbrobjets_Counter--;
			quantite--;
		};
	};
	
};

var ESZ_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	ESZ_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command.toUpperCase() === "COLLECTE") {
		if (args.length == 4) {
			ESZ.Collecte.collecter(JSON.parse(args[0]), JSON.parse(args[1]), JSON.parse(args[2]), eval(args[3]));
		} else if (args.length == 3) {
			ESZ.Collecte.collecter(JSON.parse(args[0]), JSON.parse(args[1]), 0, eval(args[2]));
		} else {
			ESZ.Collecte.collecter(JSON.parse(args[0]), JSON.parse(args[1]));
		}
	}
}


