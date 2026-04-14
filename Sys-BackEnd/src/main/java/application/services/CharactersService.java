package application.services;
import java.util.List;

import application.models.favorites.FavoritesDTO;
import application.validators.InputValidator;
import domain.entities.CharactersEntity;
import domain.exceptions.exceptionsInputData.ExceptionInputData;
import domain.exceptions.exceptionsNotFound.ExceptionNotFound;
import infrastructure.repositories.CharactersRepository;
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
            throw new ExceptionNotFound("No characters found!");
        }
        return characters;
    }

    public CharactersEntity findCharactersById(String Id) {
        var character = repository.findById(Id);

         if(character == null){
            throw new ExceptionNotFound("Character not found!");
        }
        return character;
    }

    public CharactersEntity createCharacter(FavoritesDTO character) {

        var validate = InputValidator.validateCharacterDTO(character);

        if(!validate) {
            throw new ExceptionInputData("Name, notes or datetime is invalid!");
        }

        if(repository.findById(character.getCharacter_id()) != null) {
            throw new ExceptionInputData("This Character already exists!");
        }
        
            CharactersEntity characterEntity = new CharactersEntity();
            characterEntity.setCharacter_id(character.getCharacter_id());
            characterEntity.setName(character.getName());
            characterEntity.setNotes(character.getNotes());
            characterEntity.setCreated_at(character.getCreated_at());

        repository.persist(characterEntity);
        repository.flush();

        return characterEntity;
    }

      public CharactersEntity updateCharacter(String Id, FavoritesDTO characterUpdate) {

        var validate = InputValidator.validateCharacterDTO(characterUpdate);

        if(!validate) {
            throw new ExceptionInputData("Name or notes cannot be empty!");
        }

        var findCharacter = repository.findById(Id);

         if(findCharacter == null){
            throw new ExceptionNotFound("Character not found!");
        }

        findCharacter.setName(characterUpdate.getName());
        findCharacter.setNotes(characterUpdate.getNotes());

        return findCharacter;
    }

    public void deleteCharacter(String Id) {

        var findCharacter = repository.findById(Id);

        if(findCharacter == null){
            throw new ExceptionNotFound("Character not found!");
        }
        
        repository.deleteById(findCharacter.getCharacter_id());
    }

}
