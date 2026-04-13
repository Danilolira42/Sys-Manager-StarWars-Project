import java.util.List;

import Entities.CharactersEntity;
import Entities.CharactersUpdateEntity;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CharactersService {

    private final CharactersRepository repository;

    public CharactersService(CharactersRepository repository) {
        this.repository = repository;
    }

    public List<CharactersEntity> findAllCharacters(Integer page, Integer pageSize) {
        
        var characters = repository.findAll().
        page(page, pageSize).list();

         if(characters == null){
            throw new RuntimeException("Characters not found!");
        }
        return characters;
    }

    public CharactersEntity findCharactersById(String Id) {
        var character = repository.findById(Id);

         if(character == null){
            throw new RuntimeException("Character not found!");
        }

        return character;
    }

    public CharactersEntity createCharacter(CharactersEntity character) {

        repository.persist(character);
        return character;
    }

      public CharactersEntity updateCharacter(String Id, CharactersUpdateEntity character) {

        var findCharacter = repository.findById(Id);

         if(findCharacter == null){
            throw new RuntimeException("Character not found!");
        }

        findCharacter.setName(character.getName());
        findCharacter.setNotes(character.getNotes());

        return findCharacter;
    }

    public void deleteCharacter(String Id) {

        var findCharacter = repository.findById(Id);

        if(findCharacter == null){
            throw new RuntimeException("Character not found!");
        }
        
        repository.deleteById(findCharacter.getCharacter_id());
    }

}
