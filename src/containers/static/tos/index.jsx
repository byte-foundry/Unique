// @flow
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {FormattedMessage} from 'react-intl';
import {loadLibrary} from '../../../data/font';
import {ReactComponent as Logo} from '../../app/logo.svg';
import {ReactComponent as Profile} from '../../sidebar/profile.svg';
import './TOS.css';

class TOS extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div className="TOS">
				<div className="banner">
					<Logo
						className="logos logo"
						onClick={() => this.props.redirectToLanding()}
					/>
					<Profile
						className="logos profile"
						onClick={() => {
							this.props.isAuthenticated
								? this.props.loadLibrary()
								: this.props.goToAuth();
						}}
					/>
				</div>
				<div className="container">
					<h1>
						<FormattedMessage
							id="TOS.title"
							defaultMessage="Terms of service"
							description="TOS title"
						/>
					</h1>
					<div className="content">
						<h3>Objet</h3>
						<p>
							Les présentes conditions générales ont pour objet de définir les
							modalités et conditions d'utilisation des services proposés sur le
							site www.unique.prototypo.io (ci-après : les “Services”, le
							“Site”) qui est dirigé par la société Prototypo SAS (ci-après
							"nous", “notre”, “nos” ou "Prototypo"), ainsi que de définir les
							droits et obligations des parties dans ce cadre.
						</p>
						<p>
							Elles peuvent être complétées, le cas échéant, par des conditions
							d'utilisation particulières à certains Services. En cas de
							contradiction, les conditions particulières prévalent sur ces
							conditions générales.
						</p>
						<h3>Exploitant des Services</h3>
						<p>
							Les Services sont exploités par la société Prototypo SAS, au
							capital social de 5.000 euros, immatriculée au RCS de Lyon sous le
							n° 812 750 297 , dont le siège social est situé 111, Bld de la
							Croix-Rousse, 69004 Lyon, France (ci-après : ci-après "nous",
							“notre”, “nos” ou "Prototypo").
						</p>
						<p>Prototypo peut être contactée aux coordonnées suivantes :</p>
						<p>
							Adresse postale : 111, Bld de la Croix-Rousse, 69004 Lyon, France
						</p>
						<p>Adresse électronique : contact@prototypo.io</p>
						<h3>Accès au site et aux Services</h3>
						<p>
							Les Services sont accessibles, sous réserve des restrictions
							prévues sur le Site :
						</p>
						<p>
							à toute personne physique disposant de la pleine capacité
							juridique pour s'engager au titre des présentes conditions
							générales. La personne physique qui ne dispose pas de la pleine
							capacité juridique ne peut accéder au Site et aux Services qu'avec
							l'accord de son représentant légal ;
						</p>
						<p>
							à toute personne morale agissant par l'intermédiaire d'une
							personne physique disposant de la capacité juridique pour
							contracter au nom et pour le compte de la personne morale.
						</p>
						<h3>Acceptation des conditions générales</h3>
						<p>
							L'acceptation des présentes conditions générales est matérialisée
							par la validation du formulaire d'inscription effectuée en
							cliquant sur le bouton de souscription. Cette acceptation ne peut
							être que pleine et entière. Toute adhésion sous réserve est
							considérée comme nulle et non avenue. L'Utilisateur qui n'accepte
							pas d'être lié par les présentes conditions générales ne doit pas
							utiliser les Services.
						</p>
						<h3>Inscription sur le site</h3>
						<p>
							L'inscription entraîne automatiquement l'ouverture d'un compte au
							nom de l'Utilisateur (ci-après : le «Compte»), lui donnant accès à
							un espace personnel (ci-après : l'«Espace Personnel») qui lui
							permet de gérer son utilisation des Services sous une forme et
							selon les moyens techniques que Prototypo juge les plus appropriés
							pour rendre lesdits Services.
						</p>
						<p>
							L'Utilisateur garantit que toutes les informations qu'il donne
							dans le formulaire d'inscription sont exactes, à jour et sincères
							et ne sont entachées d'aucun caractère trompeur.
						</p>
						<p>
							Il s'engage à mettre à jour ces informations dans son Espace
							Personnel en cas de modifications, afin qu'elles correspondent
							toujours aux critères susvisés.
						</p>
						<p>
							L'Utilisateur est informé et accepte que les informations saisies
							aux fins de création ou de mise à jour de son Compte vaillent
							preuve de son identité. Les informations saisies par l'Utilisateur
							l'engagent dès leur validation.
						</p>
						<p>
							L'Utilisateur peut accéder à tout moment à son Espace Personnel
							après s'être identifié à l'aide de son identifiant de connexion
							ainsi que de son mot de passe.
						</p>
						<p>
							L'Utilisateur s'engage à utiliser personnellement les Services et
							à ne permettre à aucun tiers de les utiliser à sa place ou pour
							son compte, sauf à en supporter l'entière responsabilité.
						</p>
						<p>
							Il est pareillement responsable du maintien de la confidentialité
							de son identifiant et de son mot de passe. Il doit immédiatement
							contacter Prototypo aux coordonnées mentionnées à l'article 2 des
							présentes s'il remarque que son Compte a été utilisé à son insu.
							Il reconnaît à Prototypo le droit de prendre toutes mesures
							appropriées en pareil cas.
						</p>
						<h3>Description des Services</h3>
						<p>
							L'Utilisateur a accès aux Services décrits sur le Site, sous une
							forme et selon les fonctionnalités et moyens techniques que
							Prototypo juge les plus appropriés.
						</p>
						<h3>Prix</h3>
						<p>Le prix des Services est indiqué sur le Site.</p>
						<p>
							Sauf mention contraire, les prix affichés sont convertis à partir
							du dollars américain (USD) dans la devise correspondant à la
							localisation du navigateur de l'utilisateur. La conversion est
							calculée selon le cours du jour. Toutes les taxes européennes sont
							incluses.
						</p>
						<p>
							Prototypo se réserve le droit, à sa libre discrétion et selon des
							modalités dont elle sera seule juge, de proposer des offres
							promotionnelles ou réductions de prix.
						</p>
						<h3>Révision des prix</h3>
						<p>
							Le prix de Services peut faire l'objet d'une révision par
							Prototypo à tout moment, à sa libre discrétion.
						</p>
						<p>
							L'Utilisateur sera informé de ces modifications par Prototypo par
							email sous un préavis d’un mois au moins avant l'entrée en vigueur
							des nouveaux tarifs.
						</p>
						<p>
							L'Utilisateur qui n'accepte pas les nouveaux prix doit mettre fin
							à son utilisation des Services selon les modalités prévues à
							l'article 18. A défaut, il sera réputé avoir accepté les nouveaux
							tarifs.
						</p>
						<h3>Facturation</h3>
						<p>
							Les Services font l'objet de factures qui sont communiquées à
							l'Utilisateur par tout moyen utile.
						</p>
						<h3>Modalités de paiement</h3>
						<p>
							Les modalités de paiement du prix des Services sont décrites sur
							le Site.
						</p>
						<p>
							Le paiement s'effectue par prélèvement à partir du numéro de carte
							bancaire de l'Utilisateur.
						</p>
						<p>
							Le prélèvement est mis en œuvre par le prestataire de paiement
							désigné sur le Site, qui seul conserve les coordonnées bancaires
							de l'Utilisateur à cette fin. Prototypo ne conserve aucune
							coordonnées bancaires.
						</p>
						<p>
							L'Utilisateur garantit à Prototypo qu'il dispose des autorisations
							nécessaires pour utiliser le mode de paiement choisi.
						</p>
						<h3>Retards et incidents de paiement</h3>
						<p>
							L'Utilisateur est informé et accepte expressément que tout retard
							de paiement de tout ou partie d'une somme due à son échéance
							entraînera automatiquement, sans préjudice des dispositions de
							l'article 12 et sans mise en demeure préalable :
						</p>
						<ul>
							<li>
								la déchéance du terme de l'ensemble des sommes dues par
								l'Utilisateur et leur exigibilité immédiate ;
							</li>
							<li>
								la suspension immédiate des Services en cours jusqu'au complet
								paiement de l'intégralité des sommes dues par l'Utilisateur ;
							</li>
							<li>
								la facturation au profit de Prototypo d'un intérêt de retard au
								taux de 0.93% (zéro virgule quatre-vingts-treize pourcents) le
								taux de l'intérêt légal, assis sur le montant de l'intégralité
								des sommes dues par l'Utilisateur.
							</li>
						</ul>
						<h3>Données</h3>
						<p>L'Utilisateur reconnaît et accepte expressément :</p>
						<ul>
							<li>
								que les données recueillies sur le Site et sur les équipements
								informatiques de Prototypo font foi de la réalité des opérations
								intervenues dans le cadre des présentes ;
							</li>
							<li>
								que ces données constituent le seul mode de preuve admis entre
								les parties, notamment pour le calcul des sommes dues à
								Prototypo.
							</li>
						</ul>
						<p>
							L'Utilisateur peut accéder à ces données dans son Espace
							Personnel.
						</p>
						<h3>Obligations de l'Utilisateur</h3>
						<p>
							Sans préjudice des autres obligations prévues aux présentes,
							l'Utilisateur s'engage à respecter les obligations qui suivent :
						</p>
						<ul>
							<li>
								L'Utilisateur s'engage, dans son usage des Services, à respecter
								les lois et règlements en vigueur et à ne pas porter atteinte
								aux droits de tiers ou à l'ordre public. Il est notamment seul
								responsable du bon accomplissement de toutes les formalités
								notamment administratives, fiscales et/ ou sociales et de tous
								les paiements de cotisations, taxes ou impôts de toutes natures
								qui lui incombent, le cas échéant, en relation avec son
								utilisation des Services. La responsabilité de Prototypo ne
								pourra en aucun cas être engagée à ce titre.
							</li>
							<li>
								L'Utilisateur reconnaît avoir pris connaissance sur le Site des
								caractéristiques et contraintes, notamment techniques, de
								l'ensemble des Services. Il est seul responsable de son
								utilisation des Services.
							</li>

							<li>
								L'Utilisateur est également seul responsable des relations qu'il
								pourra nouer avec les autres Utilisateurs et des informations
								qu'il leur communique dans le cadre des Services. Il lui
								appartient d'exercer la prudence et le discernement appropriés
								dans ces relations et communications. L'Utilisateur s'engage en
								outre, dans ses échanges avec les autres Utilisateurs, à
								respecter les règles usuelles de politesse et de courtoisie.
							</li>
							<li>
								L'Utilisateur s'engage à faire un usage strictement personnel
								des Services. Il s'interdit en conséquence de céder, concéder ou
								transférer tout ou partie de ses droits ou obligations au titre
								des présentes à un tiers, de quelque manière que ce soit.
							</li>
							<li>
								L'Utilisateur s'engage à fournir à Prototypo toutes les
								informations nécessaires à la bonne exécution des Services. Plus
								généralement, l'Utilisateur s'engage à coopérer activement avec
								Prototypo en vue de la bonne exécution des présentes.
							</li>
							<li>
								L'Utilisateur est seul responsable des contenus de toute nature
								(rédactionnels, graphiques, audiovisuels ou autres, en ce
								compris la dénomination et/ou l'image éventuellement choisies
								par l'Utilisateur pour l'identifier sur le Site) qu'il diffuse
								dans le cadre des Services (ci-après désignés : les «Contenus»).
								Il garantit à Prototypo qu'il dispose de tous les droits et
								autorisations nécessaires à la diffusion de ces Contenus.
							</li>
							<li>
								Il s'engage à ce que lesdits Contenus soient licites, ne portent
								pas atteinte à l'ordre public, aux bonnes mœurs ou aux droits de
								tiers, n'enfreignent aucune disposition législative ou
								règlementaire et plus généralement, ne soient aucunement
								susceptibles de mettre en jeu la responsabilité civile ou pénale
								de Prototypo.
							</li>
						</ul>
						<p>
							L'Utilisateur s'interdit ainsi de diffuser, notamment et sans que
							cette liste soit exhaustive :
						</p>
						<ul>
							<li>
								des Contenus pornographiques, obscènes, indécents, choquants ou
								inadaptés à un public familial, diffamatoires, injurieux,
								violents, racistes, xénophobes ou révisionnistes,
							</li>
							<li>des Contenus contrefaisants,</li>
							<li>des Contenus attentatoires à l'image d'un tiers,</li>
							<li>
								des Contenus mensongers, trompeurs ou proposant ou promouvant
								des activités illicites, frauduleuses ou trompeuses,
							</li>
							<li>
								des Contenus nuisibles aux systèmes informatiques de tiers (tels
								que virus, vers, chevaux de Troie, etc.),
							</li>
							<li>
								et plus généralement des Contenus susceptibles de porter
								atteinte aux droits de tiers ou d'être préjudiciables à des
								tiers, de quelque manière et sous quelque forme que ce soit.
							</li>
						</ul>
						<p>
							L'Utilisateur reconnaît que les Services lui offrent une solution
							supplémentaire mais non alternative des moyens qu'il utilise déjà
							par ailleurs pour atteindre le même objectif et que cette solution
							ne saurait se substituer à ces autres moyens.
						</p>
						<p>
							L'Utilisateur doit prendre les mesures nécessaires pour
							sauvegarder par ses propres moyens les informations de son Espace
							Personnel qu'il juge nécessaires, dont aucune copie ne lui sera
							fournie.
						</p>
						<p>
							L'Utilisateur est informé et accepte que la mise en œuvre des
							Services nécessite qu'il soit connecté à internet et que la
							qualité des Services dépend directement de cette connexion, dont
							il est seul responsable.
						</p>
						<h3>Garantie de l'Utilisateur</h3>
						<p>
							L'Utilisateur garantit Prototypo contre toutes plaintes,
							réclamations, actions et/ou revendications quelconques que
							Prototypo pourrait subir du fait de la violation, par
							l'Utilisateur de l'une quelconque de ses obligations ou garanties
							aux termes des présentes conditions générales.
						</p>
						<p>
							Il s'engage à indemniser Prototypo de tout préjudice qu'elle
							subirait et à lui payer tous les frais, charges et/ou
							condamnations qu'elle pourrait avoir à supporter de ce fait.
						</p>
						<h3>Comportements prohibés</h3>
						<p>
							Il est strictement interdit d'utiliser les Services aux fins
							suivantes :
						</p>
						<ul>
							<li>
								l'exercice d'activités illégales, frauduleuses ou portant
								atteinte aux droits ou à la sécurité des tiers,
							</li>
							<li>
								l'atteinte à l'ordre public ou la violation des lois et
								règlements en vigueur,
							</li>
							<li>
								l'intrusion dans le système informatique d'un tiers ou toute
								activité de nature à nuire, contrôler, interférer, ou
								intercepter tout ou partie du système informatique d'un tiers,
								en violer l'intégrité ou la sécurité,
							</li>
							<li>
								l'envoi d'emails non sollicités et/ou de prospection ou
								sollicitation commerciale,
							</li>
							<li>
								les manipulations destinées à améliorer le référencement d'un
								site tiers,
							</li>
							<li>
								l'aide ou l'incitation, sous quelque forme et de quelque manière
								que ce soit, à un ou plusieurs des actes et activités décrits
								ci-dessus, et plus généralement toute pratique détournant les
								Services à des fins autres que celles pour lesquelles ils ont
								été conçus.
							</li>
						</ul>
						<p>
							Il est strictement interdit aux Utilisateurs de copier et/ou de
							détourner à leurs fins ou à celles de tiers le concept, les
							technologies ou tout autre élément du site de Prototypo.
						</p>
						<p>
							Sont également strictement interdits : (I) tous comportements de
							nature à interrompre, suspendre, ralentir ou empêcher la
							continuité des Services, (I) toutes intrusions ou tentatives
							d'intrusions dans les systèmes de Prototypo , (III) tous
							détournements des ressources système du Site, (IV) toutes actions
							de nature à imposer une charge disproportionnée sur les
							infrastructures de ce dernier, (V) toutes atteintes aux mesures de
							sécurité et d'authentification, (VI) tous actes de nature à porter
							atteinte aux droits et intérêts financiers, commerciaux ou moraux
							de Prototypo ou des usagers de son site, et enfin plus
							généralement (VII) tout manquement aux présentes conditions
							générales.
						</p>
						<p>
							Il est strictement interdit de monnayer, vendre ou concéder tout
							ou partie de l'accès aux Services ou au site, ainsi qu'aux
							informations qui y sont hébergées et/ou partagées.
						</p>
						<h3>Sanctions des manquements</h3>
						<p>
							En cas de manquement à l'une quelconque des dispositions des
							présentes conditions générales ou plus généralement, d'infraction
							aux lois et règlements en vigueur par un Utilisateur, Prototypo se
							réserve le droit de prendre toute mesure appropriée et notamment
							de :
						</p>
						<ul>
							<li>
								suspendre ou résilier l'accès aux Services de l'Utilisateur,
								auteur du manquement ou de l'infraction, ou y ayant participé,
							</li>
							<li>supprimer tout contenu mis en ligne sur le Site,</li>

							<li>
								publier sur le Site tout message d'information que Prototypo
								jugera utile, avertir toute autorité concernée,
							</li>
							<li>engager toute action judiciaire.</li>
						</ul>
						<h3>Responsabilité et garantie de Prototypo</h3>
						<p>
							Prototypo s'engage à fournir les Services avec diligence et selon
							les règles de l'art, étant précisé qu'il pèse sur elle une
							obligation de moyens, à l'exclusion de toute obligation de
							résultat, ce que les Utilisateurs reconnaissent et acceptent
							expressément.
						</p>
						<p>
							Prototypo n'a pas connaissance des Contenus mis en ligne par les
							Utilisateurs dans le cadre des Services, sur lesquels elle
							n'effectue aucune modération, sélection, vérification ou contrôle
							d'aucune sorte et à l'égard desquels elle n'intervient qu'en tant
							que prestataire d'hébergement.
						</p>
						<p>
							En conséquence, Prototypo ne peut être tenue pour responsable des
							Contenus, dont les auteurs sont des tiers, toute réclamation
							éventuelle devant être dirigée en premier lieu vers l'auteur des
							Contenus en question.
						</p>
						<p>
							Les Contenus préjudiciables à un tiers peuvent faire l'objet d'une
							notification à Prototypo selon les modalités prévues par l'article
							6 I 5 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
							l'économie numérique, Prototypo se réservant de prendre les
							mesures décrites à l'article 12.
						</p>
						<p>
							Prototypo décline toute responsabilité en cas de perte éventuelle
							des informations accessibles dans l'Espace Personnel de
							l'Utilisateur, celui-ci devant en sauvegarder une copie et ne
							pouvant prétendre à aucun dédommagement à ce titre.
						</p>
						<p>
							Prototypo s'engage à procéder régulièrement à des contrôles afin
							de vérifier le fonctionnement et l'accessibilité du Site. A ce
							titre, Prototypo se réserve la faculté d'interrompre momentanément
							l'accès au Site pour des raisons de maintenance. De même,
							Prototypo ne saurait être tenue responsable des difficultés ou
							impossibilités momentanées d'accès au Site qui auraient pour
							origine des circonstances qui lui sont extérieures, la force
							majeure, ou encore qui seraient dues à des perturbations des
							réseaux de télécommunication.
						</p>
						<p>
							Prototypo ne garantit pas aux Utilisateurs (I) que les Services,
							soumis à une recherche constante pour en améliorer notamment la
							performance et le progrès, seront totalement exempts d'erreurs, de
							vices ou défauts, (I) que les Services, étant standard et
							nullement proposés à la seule intention d'un Utilisateur donné en
							fonction de ses propres contraintes personnelles, répondront
							spécifiquement à ses besoins et attentes.
						</p>
						<p>
							En tout état de cause, la responsabilité susceptible d'être
							encourue par Prototypo au titre des présentes est expressément
							limitée aux seuls dommages directs avérés subis par l'Utilisateur.
						</p>
						<h3>Propriété intellectuelle</h3>
						<p>
							Les systèmes, logiciels, structures, infrastructures, bases de
							données et contenus de toute nature (textes, images, visuels,
							musiques, logos, marques, base de données, etc …) exploités par
							Prototypo au sein du Site sont protégés par tous droits de
							propriété intellectuelle ou droits des producteurs de bases de
							données en vigueur. Tous désassemblages, décompilations,
							décryptages, extractions, réutilisations, copies et plus
							généralement, tous actes de reproduction, représentation,
							diffusion et utilisation de l'un quelconque de ces éléments, en
							tout ou partie, sans l'autorisation de Prototypo sont strictement
							interdits et pourront faire l'objet de poursuites judiciaires.
						</p>
						<p>
							Les polices de caractères exportées depuis les Services de
							Prototypo sont sous licence CC0, ce qui signifie que l'Utilisateur
							peut copier, modifier, distribuer et représenter l’œuvre, même à
							des fins commerciales, sans avoir besoin de demander
							l’autorisation.
						</p>
						<p>
							Les brevets et droits de marque commerciale qui peuvent être
							détenus par autrui ne sont en aucune façon affectés par CC0, de
							même pour les droits que pourraient détenir d’autres personnes sur
							l’œuvre ou sur la façon dont elle est utilisée, comme le droit à
							l’image ou à la vie privée. À moins d’une mention expresse
							contraire, la personne qui a identifié une œuvre à cette notice ne
							concède aucune garantie sur l’œuvre et décline toute
							responsabilité de toute utilisation de l’œuvre, dans la mesure
							permise par la loi. Lorsque l'Utilisateur utilise ou cite l’œuvre,
							il ne peut sous-entendre le soutien de l’auteur ou de la personne
							qui affirme.
						</p>
						<h3>Données à caractère personnel</h3>
						<p>
							Prototypo pratique une politique de protection des données
							personnelles dont les caractéristiques sont explicitées dans le
							document intitulé «Charte de confidentialité», dont l'Utilisateur
							est expressément invité à prendre connaissance sur le Site.
						</p>
						<h3>Publicité</h3>
						<p>
							Prototypo se réserve la faculté d'insérer sur toute page du Site
							et dans toute communication aux Utilisateurs tous messages
							publicitaires ou promotionnels sous une forme et dans des
							conditions dont Prototypo sera seule juge.
						</p>
						<h3>Liens et sites tiers</h3>
						<p>
							Prototypo ne pourra en aucun cas être tenue pour responsable de la
							disponibilité technique de sites internet ou d'applications
							mobiles exploités par des tiers (y compris ses éventuels
							partenaires) auxquels l'Utilisateur accéderait par l'intermédiaire
							du Site.
						</p>
						<p>
							Prototypo n'endosse aucune responsabilité au titre des contenus,
							publicités, produits et/ou services disponibles sur de tels sites
							et applications mobiles tiers dont il est rappelé qu'ils sont
							régis par leurs propres conditions d'utilisation.
						</p>
						<p>
							Prototypo n'est pas non plus responsable des transactions
							intervenues entre l'Utilisateur et un quelconque annonceur,
							professionnel ou commerçant (y compris ses éventuels partenaires)
							vers lequel l'Utilisateur serait orienté par l'intermédiaire du
							Site et ne saurait en aucun cas être partie à quelques litiges
							éventuels que ce soit avec ces tiers concernant notamment la
							livraison de produits et/ou services, les garanties, déclarations
							et autres obligations quelconques auxquelles ces tiers sont tenus.
						</p>
						<h3>Désinscription</h3>
						<p>
							L'Utilisateur peut se désinscrire des Services à tout moment, en
							adressant une demande à cet effet à Prototypo par email, aux
							coordonnées mentionnées à l'article 2.
						</p>
						<p>
							La désinscription est effective immédiatement. Elle entraîne la
							suppression automatique du Compte de l'Utilisateur.
						</p>
						<h3>Modifications</h3>
						<p>
							Prototypo se réserve la faculté de modifier à tout moment les
							présentes conditions générales.
						</p>
						<p>
							L'Utilisateur sera informé de ces modifications par tout moyen
							utile.
						</p>
						<p>
							L'Utilisateur qui n'accepte pas les conditions générales modifiées
							doit se désinscrire des Services selon les modalités prévues à
							l'article 18.
						</p>
						<p>
							Tout Utilisateur qui a recours aux Services postérieurement à
							l'entrée en vigueur des conditions générales modifiées est réputé
							avoir accepté ces modifications.
						</p>
						<h3>Langue</h3>
						<p>
							Dans l'hypothèse d'une traduction des présentes conditions
							générales dans une ou plusieurs langues, la langue
							d'interprétation sera la langue française en cas de contradiction
							ou de contestation sur la signification d'un terme ou d'une
							disposition.
						</p>
						<h3>Loi applicable et juridiction</h3>
						<p>
							Les présentes conditions générales sont régies par la loi
							française.
						</p>
						<p>
							En cas de contestation sur la validité, l'interprétation et/ou
							l'exécution des présentes conditions générales, les parties
							conviennent que les tribunaux de Lyon seront exclusivement
							compétents pour en juger, sauf règles de procédure impératives
							contraires.
						</p>
						<h3>Entrée en vigueur</h3>
						<p>
							Les présentes conditions générales sont entrées en vigueur le 6
							avril 2018.
						</p>

						<h1>TERMS AND CONDITIONS</h1>
						<h3>Object</h3>
						<p>
							The purpose of these terms and conditions is to define the terms
							and conditions for the use of the services offered on the site
							www.unique.prototypo.io (hereinafter the "Services", the “Site”)
							which is operated by the company Prototypo SAS (hereinafter "we",
							"us", "our" or “Prototypo”), and to define the rights and
							obligations of the parties in this context.
						</p>
						<p>
							They may be supplemented, if necessary, by conditions of use
							specific to certain Services. In case of contradiction, the
							special conditions prevail over these general conditions.
						</p>
						<h3>Operator of the Services</h3>
						<p>
							The Services are operated by the company Prototypo SAS, with a
							share capital of € 5,000, registered with the RCS in Lyon, France,
							with the number 812 750 297 with the following legal address: 111,
							Boulevard de la Croix-Rousse, 69004, Lyon, France.
						</p>
						<p>Prototypo can be contacted as follow :</p>
						<p>
							By mail : 111, Boulevard de la Croix-Rousse, 69004, Lyon, France.
						</p>
						<p>By e-mail : contact@prototypo.io</p>
						<h3>Access to Site and Services</h3>
						<p>
							The Services are accessible, subject to the restrictions provided
							on the Site:
						</p>
						<ul>
							<li>
								To any natural person with full legal capacity to commit under
								these general conditions. An individual who does not have full
								legal capacity may access the Site and the Services only with
								the agreement of his legal representative;
							</li>
							<li>
								To any legal person acting through a natural person with legal
								capacity to contract in the name and on behalf of the legal
								person.
							</li>
						</ul>
						<h3>Acceptance of Terms and Conditions</h3>
						<p>
							Acceptance of these general conditions is evidenced by the
							validation of the registration form made by clicking on the
							subscription button. This acceptance can only be full and
							complete. Any adherence under reservation shall be considered null
							and not done. Users who do not agree to be bound by these terms
							and conditions shall not use the Services.
						</p>
						<h3>Registration on the site</h3>
						<p>
							Registration automatically entails the opening of an account in
							the name of the User (the "Account"), giving access to a personal
							space (the "Personal Space") which makes it possible to manage its
							use of the Services in a form and according to the technical means
							that Prototypo deems most appropriate to render the Services.
						</p>
						<p>
							The User warrants that all information provided in the
							registration form is accurate, up-to-date and truthful and is not
							misleading.
						</p>
						<p>
							He / she undertakes to update this information in his / her
							“Personal Space” in case of modifications, so that they always
							correspond to the above mentioned criteria.
						</p>
						<p>
							The User is informed and accepts that the information entered for
							the creation or the updating of his / her “Account” are proof of
							his / her identity. The information entered by the”User” engages
							it as soon as they are validated.
						</p>
						<p>
							The “User” can access his “Personal Area” at any time after having
							identified himself with his login and password.
						</p>
						<p>
							The User undertakes to personally use the Services and not to
							allow any third party to use them in his place or on his behalf,
							except to assume full responsibility for them.
						</p>
						<p>
							He is also responsible for maintaining the confidentiality of his
							username and password. He must immediately contact Prototypo at
							the contact details mentioned in Article 2 of this form if he
							notices that his Account has been used without his knowledge. It
							recognizes Prototypo's right to take all appropriate measures in
							such cases.
						</p>
						<h3>Description of Services</h3>
						<p>
							The User has access to the Services described on the Site, in a
							form and according to the functionalities and technical means that
							Prototypo deems most appropriate.
						</p>
						<h3>Price</h3>
						<p>The price of the Services is indicated on the Site.</p>
						<p>
							Unless otherwise stated, the prices displayed are expressed in the
							currency corresponding to the localisation of the user’s Web
							browser. They are converted from the US Dollar according to the
							daily rate. All European taxes are included.
						</p>
						<p>
							Prototypo reserves the right, at its own discretion and under the
							terms and conditions of its own discretion, to propose promotional
							offers or price reductions.
						</p>
						<h3>Price-revision</h3>
						<p>
							The price of Services may be reviewed by Prototypo at any time at
							its discretion.
						</p>
						<p>
							The User will be notified of these modifications by Prototypo by
							e-mail at least one month before the new tarifs apply.
						</p>
						<p>
							Users who do not accept new prices must stop using the Services in
							accordance with the terms and conditions set out in Article 18.
							Failing that, they will be judged to have accepted the new rates.
						</p>
						<h3>Billing</h3>
						<p>
							The Services are subject of invoices which are communicated to the
							User by any useful means.
						</p>
						<h3>Payment modalities</h3>
						<p>
							Terms of payment for the Services are described on the website.
						</p>
						<p>
							Payment is made by direct debit from the credit card number of the
							User.
						</p>
						<p>
							The withdrawal is implemented by the payment provider designated
							on the Site, which only keeps the bank account of the User for
							this purpose. Prototypo does not keep any bank details.
						</p>
						<p>
							The User warrants to Prototypo that he has the necessary
							authorizations to use the chosen payment method.
						</p>
						<h3>Delays and payment incidents</h3>
						<p>
							The User is expressly informed and accepts that any delay in
							payment of all or part of the amount due at its expiration will
							automatically entail, without prejudice to the provisions of
							Article 12 and without prior notice:
						</p>
						<ul>
							<li>
								The decay of the term of all the sums owed by the User and their
								immediate exigibility;
							</li>
							<li>
								The immediate suspension of the Services in progress until the
								complete payment of the sums due by the User;
							</li>
							<li>
								The invoicing to Prototypo of interest at the rate of 0.93%
								(zero point ninety-three percent) the rate of legal interest,
								based on the amount of the total amount owed by the User.
							</li>
						</ul>
						<h3>Data</h3>
						<p>The User acknowledges and expressly agrees:</p>
						<ul>
							<li>
								The data collected on the Site and on the computer equipment of
								Prototypo/Unique are proof of the reality of the operations
								carried out as stated in here.
							</li>
							<li>
								These data constitute the only mode of proof admitted between
								the parties, in particular for the calculation of sums due to
								Prototypo.
							</li>
							<li>The User can access this data in his Personal Space.</li>
						</ul>
						<h3>Obligations of the User</h3>
						<p>
							Without prejudice to the other obligations provided in here, the
							User undertakes to respect the following obligations:
						</p>
						<p>
							The User undertakes, in his/her use of the Services, to respect
							the laws and regulations in force and not to infringe the rights
							of third parties or public order.
						</p>
						<p>
							In particular, he / she is solely responsible for the proper
							fulfillment of all administrative, fiscal and / or social
							formalities and all payments of contributions, or taxes of any
							kind which he / she may have to pay in connection with his or her
							use of the Services. In any case or event Prototypo will not be
							liable in this respect.
						</p>
						<p>
							The User acknowledges that he has taken the understanding on the
							Site of the characteristics and constraints, in particular
							technical, of all the Services. He / she is the only responsible
							for the use of the Services.
						</p>
						<p>
							The User is also solely responsible for the relations he / she may
							establish with the other Users and the information he communicates
							to them within the framework of the Services. It is his / her
							responsibility to exercise appropriate prudence and discernment in
							these relationships and communications. The User further agrees,
							in his / her exchanges with other Users, to respect the usual
							rules of politeness and courtesy.
						</p>
						<p>
							The User agrees to make strictly personal use of the Services.
							Consequently, it is prohibited to assign, grant or transfer all or
							any of the rights or obligations here described to any third party
							in any way whatsoever.
						</p>
						<p>
							The User agrees to provide Prototypo with all information
							necessary for the proper performance of the Services. More
							generally, the User agrees to cooperate actively with Prototypo
							for the proper execution of the present.
						</p>
						<p>
							The User is solely responsible for the contents of any kind
							(editorial, graphic, audiovisual or other, including the name and
							/ or image possibly chosen by the User to identify it on the Site)
							The Services (the "Contents").
						</p>
						<p>
							The User guarantees to Prototypo that he / she has all the rights
							and authorizations necessary for the diffusion of these Contents.
						</p>
						<p>
							He / she undertakes to ensure that the mentioned Content is
							lawful, does not infringe public order, morality or the rights of
							third parties, infringe any legislative or regulatory provision
							and, more generally, it does not’ compromise the civil and legal
							responsibility of Prototypo.
						</p>
						<p>
							The User is also forbidden to broadcast, in particular and without
							this list being exhaustive:
						</p>
						<ul>
							<li>
								Pornographic, obscene, indecent, offensive or inappropriate to a
								family audience, defamatory, abusive, violent, racist,
								xenophobic or revisionist content.
							</li>
							<li>Counterfeit Content.</li>
							<li>Content that is a threat to the image of a third party,</li>
							<li>
								Misleading or deceptive content or proposing or promoting
								illicit, fraudulent or misleading activities.
							</li>
							<li>
								Content harmful to the computer systems of others (such as
								viruses, worms, Trojans, etc.),
							</li>
						</ul>
						<p>
							And more generally of the Contents which may infringe the rights
							of third parties or be prejudicial to third parties, in any manner
							and in any form whatsoever.
						</p>
						<p>
							The User acknowledges that the Services offer him an additional
							but non-alternative solution of the means which he /she already
							uses to achieve the same objective and that this solution can not
							be a substitute for these other means.
						</p>
						<p>
							The User must take the necessary measures to safeguard by his own
							means the information of his Personal Space that he deems
							necessary, of which no copy will be provided.
						</p>
						<p>
							The User is informed and accepts that the implementation of the
							Services requires that it is connected to the Internet and that
							the quality of the Services depends directly on this connection,
							of which he / she is the only responsible.
						</p>
						<h3>User Guarantee</h3>
						<p>
							The User warrants Prototypo against any claims, complains, actions
							and / or accusations that Prototypo may suffer as a result of the
							User's breach of any of its obligations or warranties under these
							terms and conditions.
						</p>
						<p>
							He / she agrees to compensate Prototypo for any prejudice suffered
							by it and to pay all costs, charges and / or convictions which it
							may have to bear as a result.
						</p>
						<h3>Prohibited behaviors</h3>
						<p>
							It is strictly forbidden to use the Services for the following
							purposes:
						</p>
						<ul>
							<li>
								The illegal, fraudulent or infringing activities of a third
								party.
							</li>
							<li>
								The breach of public order or the violation of the laws and
								regulations in force.
							</li>
							<li>
								Intrusion into the computer system of a third party or any
								activity likely to harm, control, interfere, or intercept all or
								part of the computer system of a third party, violate integrity
								or security,
							</li>
							<li>
								Sending of unsolicited emails and / or prospecting or commercial
								solicitation.
							</li>
							<li>
								The manipulations intended to improve the referencing of a third
								party site.
							</li>
							<li>
								Assistance or incitement, in any form or by any means, to one or
								more of the acts and activities described above.
							</li>
							<li>
								And more generally any practice diverting the Services for
								purposes other than those for which they were designed.
							</li>
							<li>
								Users are strictly prohibited from copying and / or diverting
								the concept, technology or any other element of the Site for
								their own or third party purposes.
							</li>
						</ul>
						<p>
							The following are also strictly prohibited: (I) any behavior
							likely to interrupt, suspend, slow down or prevent the continuity
							of the Services, (II) any intrusion or attempted intrusion into
							the Prototypo systems, (III) all hijacking site system resources,
							(IV) any action likely to impose a disproportionate burden on the
							infrastructure of the latter, (V) any breach of security and
							authentication measures, (VI) any act likely to infringe financial
							rights and interests , Commercial or moral of Prototypo or the
							users of its site, and more generally (VII) any breach of these
							general conditions.
						</p>
						<p>
							It is strictly forbidden to cash, sell or grant all or part of the
							access to the Services or the Site, as well as to the information
							hosted therein and / or shared.
						</p>
						<h3>Penalties for breaches</h3>
						<p>
							In the event of breach of any of the provisions of these general
							conditions or more generally of violation of the laws and
							regulations in force by a User, Prototypo reserves the right to
							take any appropriate measure and in particular of:
						</p>
						<ul>
							<li>
								Suspend or terminate access to, or participation in, the
								Services of the User, the person who committed the breach or
								infringement.
							</li>
							<li>Delete any content posted on the Site.</li>
							<li>
								Publish on the Site any information message that Prototypo deems
								useful.
							</li>
							<li>Notify any relevant authority.</li>
							<li>Any legal action.</li>
						</ul>
						<h3>Prototypo's liability and warranty</h3>
						<p>
							Prototypo undertakes to provide the Services with diligence and
							according to the standard rules, it has being specified that it
							weighs on it an obligation of means, with the exclusion of any
							obligation of result, what the Users acknowledge and expressly
							accept .
						</p>
						<p>
							Prototypo is not aware of any Content posted by Users in
							connection with the Services, on which it does not make any
							moderation, selection, verification or control of any kind and for
							which it only intervenes As a hosting provider.
						</p>
						<p>
							Consequently, Prototypo can not be held liable for the Contents,
							the authors of which are third parties, any possible claim to be
							directed in the first place towards the author of the Contents in
							question.
						</p>
						<p>
							Contents harmful to a third party may be notified to Prototypo in
							accordance with the provisions of Article 6 I 5 of Law No 2004-575
							of 21 June 2004 for confidence in the digital economy, Prototypo
							Reserving the right to take the measures described in Article 12.
						</p>
						<p>
							Prototypo shall not be liable for any loss of information
							available in the User's Personal Area, who must save a copy of the
							information and can not claim any compensation in this respect.
						</p>
						<p>
							Prototypo undertakes to carry out regular checks to verify the
							operation and accessibility of the Site. As such, Prototypo
							reserves the right to temporarily interrupt access to the Site for
							maintenance reasons. Similarly, Prototypo can not be held
							responsible for the temporary difficulties or impossibilities of
							access to the Site which are caused by circumstances outside it,
							force majeure, or which are due to disturbances of the
							telecommunication networks.
						</p>
						<p>
							Prototypo does not warrant to Users (I) that the Services, subject
							to constant research to improve performance and progress, will be
							completely free from errors, defects or defects, (I) that the
							Services are standard and in no way proposed to the sole intention
							of a given User according to his : her own personal constraints,
							will respond specifically to his / her needs and expectations.
						</p>
						<p>
							In any event, the liability likely to be incurred by Prototypo as
							stated is expressly limited to the only direct damage suffered by
							the User.
						</p>
						<h3>Intellectual property</h3>
						<p>
							The software, structures, infrastructures, databases and contents
							of any kind (texts, images, visuals, music, logos, trademarks,
							database, etc.) operated by Prototypo within the Site are
							protected by Intellectual property or rights of existing database
							producers. All acts of reproduction, representation, dissemination
							and use of any of these elements, in whole or in part, without the
							authorization of Prototypo, are strictly prohibited and any
							disassembly, decompilation, decryption, extraction, reuse, may be
							prosecuted.
						</p>
						<p>
							The fonts exported from Prototypo Services are licensed CC0, which
							means that the User may copy, modify, distribute and represent the
							work, even for commercial purposes, without the need for
							permission.
						</p>
						<p>
							Patents and trademark rights that may be held by others are not
							affected in any way by CC0, nor for the rights that others may
							have over the work or how it is used, such as the right Image or
							privacy.
						</p>
						<p>
							Unless otherwise expressly stated, the person who has identified a
							work with this notice does not grant any warranty on the work and
							declines any responsibility for any use of the work, to the extent
							permitted by law.
						</p>
						<p>
							When the User uses or mentions the work, it can not imply the
							support of the author or the person who asserts.
						</p>
						<h3>Personal data</h3>
						<p>
							Prototypo practices a policy of protection of the personal data
							whose characteristics are explained in the document entitled
							"Privacy Policy", of which the User is expressly invited to take
							notice on the Site.
						</p>
						<h3>Publicity</h3>
						<p>
							Prototypo reserves the right to insert on any page of the Site and
							in any communication to the Users all advertising or promotional
							messages in a form and under conditions of which Prototypo will be
							the sole judge.
						</p>
						<h3>Links and third-party sites</h3>
						<p>
							In no event shall Prototypo be held responsible for the technical
							availability of websites or mobile applications operated by third
							parties (including potential partners) to which the User may
							access via the Site.
						</p>
						<p>
							Prototypo assumes no responsibility for the content, advertising,
							products and / or services available on such third-party websites
							and mobile applications, which are reminded that they are governed
							by their own terms of use.
						</p>
						<p>
							Prototypo shall not be liable for any transactions between the
							User and any advertiser, professional or merchant (including any
							potential partners) to which the User is directed via the Site and
							shall in no way be liable party to any disputes with third parties
							concerning the delivery of products and / or services, warranties,
							declarations and other obligations to which such third parties are
							liable.
						</p>
						<h3>Unsubscription</h3>
						<p>The Services are subscribed for an indefinite period.</p>
						<p>
							The User may unsubscribe from the Services at any time by sending
							a request to Prototypo by email to the contact details mentioned
							in Article 2.
						</p>
						<p>
							Unsubscription is effective immediately. It causes the User
							Account to be deleted automatically.
						</p>
						<h3>Changes</h3>
						<p>
							Prototypo reserves the right to modify these general conditions at
							any time.
						</p>
						<p>
							The User will be informed of these changes by any useful means.
						</p>
						<p>
							Users who do not accept the modified terms and conditions must opt
							out of the Services in accordance with the terms and conditions
							set out in Article 18.
						</p>
						<p>
							Any User who uses the Services after the coming into force of the
							modified terms and conditions shall be deemed to have accepted the
							modifications.
						</p>
						<h3>Language</h3>
						<p>
							In the event of a translation of the present general conditions
							into one or more languages, the language of interpretation shall
							be the French language in the event of contradiction or dispute as
							to the meaning of a term or provision.
						</p>
						<h3>Applicable law and jurisdiction</h3>
						<p>
							These general terms and conditions are governed by French law.
						</p>
						<p>
							In the event of a dispute as to the validity, interpretation and /
							or execution of the present general conditions, the parties agree
							that the courts of Lyon (France) shall have exclusive jurisdiction
							to rule on them, except in the case of mandatory rules of
							procedure to the contrary.
						</p>
						<h3>Coming into force</h3>
						<p>
							These Terms and Conditions came into force on April the sixth of
							2018.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: typeof state.user.graphqlID === 'string',
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			redirectToLanding: () => push('/'),
			goToAuth: () => push({pathname: '/app/auth', authData: {}}),
			loadLibrary,
		},
		dispatch,
	);

TOS.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TOS);
