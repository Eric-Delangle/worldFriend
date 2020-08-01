<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\HobbiesRepository;
use ApiPlatform\Core\Annotation\ApiResource;

  /**
 * @ORM\Entity(repositoryClass=HobbiesRepository::class)
 *  @ApiResource(
 *  subresourceOperations = {
 *      "api_users_hobbies_get_subresource" = {
 *              "normalization_context" = {"groups"= {"hobbies_subresource"}, "enable_max_depth" = true}
 *   },
 * },
 *  normalizationContext ={"groups" = {"hobbies_read", "users_read"}}
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
     * @groups({"users_read", "hobbies_read"}),
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="hobbies",cascade={"persist"})
     * @groups({"users_read", "hobbies_read"}),
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
