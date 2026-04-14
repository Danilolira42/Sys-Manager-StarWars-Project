package domain.models.favorites;

import java.time.OffsetDateTime;

public class FavoritesDTO {
public String character_id;
public String name;
public String notes;
public OffsetDateTime created_at;

public FavoritesDTO() {}

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

   public OffsetDateTime getCreated_at() {
      return created_at;
   }

   public void setCreated_at(OffsetDateTime created_at) {
      this.created_at = created_at;
   }
}
