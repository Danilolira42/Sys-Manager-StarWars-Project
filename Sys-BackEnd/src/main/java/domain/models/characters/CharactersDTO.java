package domain.models.characters;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CharactersDTO {
    public List<CharacterDTO> results;
}
