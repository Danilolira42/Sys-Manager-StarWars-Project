package Entities;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sw_favorite_character")
public class CharactersEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   private String character_id;
   private String name;
   private String notes;
   private LocalDate created_at;

   public CharactersEntity() {}

   public String getCharacter_id() {
      return character_id;
   }

   public void setCharacter_id(String character_id) {
      this.character_id = character_id;
   }

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

   public LocalDate getCreated_at() {
      return created_at;
   }

   public void setCreated_at(LocalDate created_at) {
      this.created_at = created_at;
   }

}
