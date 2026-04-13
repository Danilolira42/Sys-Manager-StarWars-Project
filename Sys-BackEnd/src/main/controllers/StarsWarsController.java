package controllers;
import java.util.List;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import modelsDTO.CharacterDTO;

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
}
