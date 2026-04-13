import java.net.URI;

import Entities.CharactersEntity;
import Entities.CharactersUpdateEntity;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

@Path("/characters")
public class CharactersController {

    private final CharactersService service;

    public CharactersController(CharactersService service) {
        this.service = service;
    }

    @GET
    @Path("/allCharacters")
    public Response findAllCharacters(@QueryParam("page") Integer page,
            @QueryParam("pageSize") Integer pageSize) {

        var characters = service.findAllCharacters(page, pageSize);

        return Response.ok(characters).build();
    }

    @GET
    @Path("/{Id}")
    public Response findCharactersById(@PathParam("Id") String Id) {

        var characters = service.findCharactersById(Id);

        return Response.ok(characters).build();
    }

    @POST
    @Transactional
    public Response createCharacter(CharactersEntity character) {

        URI location = URI.create("characters/" + character.getCharacter_id());
        return Response.created(location).entity(character).build();
    }

    @PUT
    @Path("{Id}")
    @Transactional
    public Response updateCharacter(@PathParam("Id") String Id, CharactersUpdateEntity character) {
        return Response.noContent().entity(character).build();
    }

    @DELETE
    @Path("{Id}")
    @Transactional
    public Response deleteCharacter(@PathParam("Id") String Id) {
        return Response.noContent().build();
    }
}
