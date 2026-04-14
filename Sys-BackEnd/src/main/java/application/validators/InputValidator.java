package application.validators;
import application.models.favorites.FavoritesDTO;

public class InputValidator {

    public static boolean validateCharacterDTO(FavoritesDTO character) {
        
        if(character.character_id == null || character.character_id.isEmpty()) {
            return false;
        }
        if(character.name == null || character.name.isEmpty()) {
            return false;
        }
        if(character.notes == null || character.notes.isEmpty()) {
            return false;
        }
        return true;
    }
}
