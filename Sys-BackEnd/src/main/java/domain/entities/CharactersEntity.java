package domain.entities;
import java.time.OffsetDateTime;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sw_favorite_character")
public class CharactersEntity {

   @Id
   @JdbcTypeCode(java.sql.Types.VARCHAR)
   private String character_id;
   private String name;
   private String notes;
   private OffsetDateTime created_at;

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

   public OffsetDateTime getCreated_at() {
      return created_at;
   }

   public void setCreated_at(OffsetDateTime created_at) {
      this.created_at = created_at;
   }
}

