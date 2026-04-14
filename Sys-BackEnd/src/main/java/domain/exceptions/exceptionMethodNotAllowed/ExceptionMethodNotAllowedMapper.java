package domain.exceptions.exceptionMethodNotAllowed;

import jakarta.ws.rs.NotAllowedException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ExceptionMethodNotAllowedMapper implements ExceptionMapper<NotAllowedException> {

    @Override
    public Response toResponse(NotAllowedException exception) {

        return Response.status(Response.Status.METHOD_NOT_ALLOWED.getStatusCode())
                .entity("Your request method is not allowed for this endpoint. Please talk to administrator for more information.")
                .build();
    }

}
