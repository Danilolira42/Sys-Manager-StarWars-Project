package domain.exceptions.exceptionCharacterAlreadyExists;

public class ExceptionCharacterAlreadyExists extends RuntimeException {

    private String error;

    public ExceptionCharacterAlreadyExists(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }
    
}
