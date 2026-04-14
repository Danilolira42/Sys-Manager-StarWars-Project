package domain.exceptions.exceptionsInputData;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ExceptionInputDataMapper implements ExceptionMapper<ExceptionInputData> {

    @Override
    public Response toResponse(ExceptionInputData exception) {
        return Response.status(Response.Status.BAD_REQUEST.getStatusCode())
                .entity(exception.getListError())
                .build();
    }    
}
