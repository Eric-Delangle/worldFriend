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
        

                //pour chaque pays je veux des users
                            for ($u = 0; $u < 10; $u++) {
                                $user = new User();
                                $hash = $this->encoder->encodePassword($user, 'password');
                                $user->setFirstName($faker->firstName)
                                            ->setLastName($faker->lastName)
                                            ->setCity($faker->city)
                                            ->setPassword($hash)          
                                            ->setCountry( $faker->country)
                                            ->setEmail($faker->email)
                                            ->setRegisteredAt($faker->dateTimeBetween($startDate = '-6 months', $endDate = 'now') )  
                                            ->setContinent($faker->randomElement($continents));
                         
                                            // pour chaque user je veux un ou plusieurs hobbies
                                            for ($h = 0; $h < mt_rand(1, 5) ; $h++) {
                                                $hobbies = new Hobbies();
                                                $hobbies->setName($faker->randomElement(['Cuisine', 'Art', 'Voyage', 'Sciences', 'Sport']));
                                                $hobbies->setUser($user);
                                                 $manager->persist($hobbies);
                                                }

                                              
                                                $manager->persist($user);
                        }
                    
                    $manager->flush();
            }
        }





       