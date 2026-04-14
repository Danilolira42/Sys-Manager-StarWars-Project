package domain.exceptions.exceptionsInputData;

import java.util.List;

public class ExceptionInputData extends RuntimeException {
    
    private List<String> errors;

    public ExceptionInputData(String error) {
        this.errors = List.of(error);
    }

    public List<String> getListError() {
        return errors;
    }
    
}
