package application.models.characters;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CharacterDTO {
    public String character_id;
    public String name;
    public String gender;
    public OffsetDateTime created;
}
