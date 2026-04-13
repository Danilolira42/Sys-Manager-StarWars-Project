package Entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sw_favorite_character")
public class CharactersUpdateEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   private String name;
   private String notes;

   public CharactersUpdateEntity() {}

    public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

    public String getNotes() {
      return notes;
   }

   public void setNotes(String notes) {
      this.notes = notes;
   }

}
