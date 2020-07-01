<?php

namespace App\DataFixtures;

use DateTime;
use Faker\Factory;
use App\Entity\Pays;
use App\Entity\User;
use App\Entity\Hobbies;
use App\Entity\Continent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints\Length;

class AppFixtures extends Fixture
{

    /** 
     *  Encodeur des mots de passe
     * 
     * @var UserPasswordEncoderInterface
    */
   
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder) {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $continents =['Europe', 'Asie', 'Afrique', 'Amérique du nord', 'Amérique du sud'] ;
        

        foreach($continents as $name){
            $continent = new Continent();
            $continent->setName($name); 
            $manager->persist($continent);
            $manager->flush();
        }
        
       


        for ($u = 0; $u < 10; $u++) {
            $user = new User();
            $hash = $this->encoder->encodePassword($user, 'password');
            $user->setFirstName($faker->firstName)
                        ->setLastName($faker->lastName)
                        ->setCity($faker->city)
                        ->setPassword($hash)          
                        ->setCountry( $faker->country)
                        ->setEmail($faker->email)
                        ->setRegisteredAt($faker->dateTimeBetween($startDate = '-6 months', $endDate = 'now') );

                        for($p = 0; $p < 1; $p++) {
                            $country = new Pays();
                            $country->setName($user->getCountry());
                            $manager->persist($country);
                        }

                        for ($h = 0; $h < 1 ; $h++) {
                            $hobbies = new Hobbies();
                            $hobbies->setName($faker->randomElement(['Cuisine', 'Art', 'Voyage', 'Sciences', 'Sport']));
                             $manager->persist($hobbies);
                            }

                         $user->addHobby($hobbies);
                         $pays[] = $user->getCountry();
                        $manager->persist($user);
                        
                    
                }
            
            
        $manager->flush();
    }
}

