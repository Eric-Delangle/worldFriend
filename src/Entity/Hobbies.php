<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\HobbiesRepository;
use ApiPlatform\Core\Annotation\ApiResource;

  /**
 * @ORM\Entity(repositoryClass=HobbiesRepository::class)
 * @ApiResource(
 *  collectionOperations={"GET"},
 *  itemOperations={"GET"}
 * )
 */
class Hobbies
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="hobbies",cascade={"persist"})
     */
    private $user;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

}
