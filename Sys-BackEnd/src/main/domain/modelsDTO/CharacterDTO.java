package modelsDTO;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CharacterDTO {
    public String name;
    public String gender;
    public OffsetDateTime created;
}
