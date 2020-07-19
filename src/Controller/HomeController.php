<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this->render('home/index.html.twig', []);
    }

    
    /* la je veux recuperer les lieux de mes membres en bases de données afin de les transformer en json
    et pouvoir les afficher sur la map */
     /**
     * @Route("/", name="home")
     */
    public function membersLocations(SerializerInterface $serializer) {

        //je récupere le repository des users et je vais checher ses infos
        $repositoryUser = $this->getDoctrine()->getRepository(User::class);
        $user = $repositoryUser->findAll();


        // la je vais chercher son pays

            $serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);


            $data = $serializer->serialize($user, 'json',
            
            ['attributes' => ["country"]]);
            json_encode($data);
            


            // Création du fichier json user

            // Nom du fichier à créer
            $members = 'members.json';

            // Ouverture du fichier
            $members = fopen($members, 'w+');

            // Ecriture dans le fichier
            fwrite($members, $data);
            

            // Fermeture du fichier
            fclose($members);
                    
                    return $this->render('home/index.html.twig');

        }
}
