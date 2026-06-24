CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
AS
BEGIN

    UPDATE Accounts
    SET Balance=Balance+(Balance*0.01),
        LastModified=SYSDATE
    WHERE AccountType='Savings';

    COMMIT;

END;

BEGIN
    ProcessMonthlyInterest;
END;

SELECT * FROM Accounts;



CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus
(
    p_department VARCHAR2,
    p_bonus NUMBER
)
AS
BEGIN

    UPDATE Employees
    SET Salary=Salary+(Salary*p_bonus/100)
    WHERE Department=p_department;

    COMMIT;

END;

BEGIN
    UpdateEmployeeBonus('IT',10);
END;

SELECT * FROM Employees;

CREATE OR REPLACE PROCEDURE TransferFunds
(
    p_fromAccount NUMBER,
    p_toAccount NUMBER,
    p_amount NUMBER
)
AS

v_balance NUMBER;

BEGIN

    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID=p_fromAccount;

    IF v_balance>=p_amount THEN

        UPDATE Accounts
        SET Balance=Balance-p_amount,
            LastModified=SYSDATE
        WHERE AccountID=p_fromAccount;

        UPDATE Accounts
        SET Balance=Balance+p_amount,
            LastModified=SYSDATE
        WHERE AccountID=p_toAccount;

        COMMIT;

        DBMS_OUTPUT.PUT_LINE('Transfer Successful');

    ELSE

        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');

    END IF;

END;

BEGIN
    TransferFunds(1,2,500);
END;

SELECT * FROM Accounts;