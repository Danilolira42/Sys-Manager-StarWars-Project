package resources.controllers;
import java.util.List;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import domain.interfaces.ExternalServiceInterface;
import domain.models.characters.CharacterDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("/starwars")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class StarsWarsController {

    @Inject
    @RestClient
    private  ExternalServiceInterface external;
    
    @GET
    public List<CharacterDTO> getAllCharacters(){
        return external.getAllCharacters().results;
    }

    @GET
    @Path("/page")
    public List<CharacterDTO> getCharacterByPage(@QueryParam("page") Integer page){
        return external.getAllCharactersByPage(page).results;
    }

    @GET
    @Path("/characters/search")
    public List<CharacterDTO> getCharacterByName(@QueryParam("name") String name){
        return external.getCharacterByName(name).results;
    }
}
