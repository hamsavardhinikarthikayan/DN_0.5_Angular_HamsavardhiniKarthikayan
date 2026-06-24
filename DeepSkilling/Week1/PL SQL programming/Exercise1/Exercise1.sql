CREATE TABLE Customers (
    CustomerID NUMBER PRIMARY KEY,
    Name VARCHAR2(100),
    DOB DATE,
    Balance NUMBER,
    LastModified DATE
);

CREATE TABLE Accounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    AccountType VARCHAR2(20),
    Balance NUMBER,
    LastModified DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Transactions (
    TransactionID NUMBER PRIMARY KEY,
    AccountID NUMBER,
    TransactionDate DATE,
    Amount NUMBER,
    TransactionType VARCHAR2(10),
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

CREATE TABLE Loans (
    LoanID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    LoanAmount NUMBER,
    InterestRate NUMBER,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Employees (
    EmployeeID NUMBER PRIMARY KEY,
    Name VARCHAR2(100),
    Position VARCHAR2(50),
    Salary NUMBER,
    Department VARCHAR2(50),
    HireDate DATE
);
ALTER TABLE Customers
ADD IsVIP VARCHAR2(5);

INSERT INTO Customers
VALUES (1, 'John Doe', TO_DATE('1955-05-15','YYYY-MM-DD'), 12000, SYSDATE, 'FALSE');

INSERT INTO Customers
VALUES (2, 'Jane Smith', TO_DATE('1990-07-20','YYYY-MM-DD'), 1500, SYSDATE, 'FALSE');

INSERT INTO Customers
VALUES (3, 'Robert Wilson', TO_DATE('1948-03-10','YYYY-MM-DD'), 20000, SYSDATE, 'FALSE');

INSERT INTO Accounts
VALUES (1,1,'Savings',1000,SYSDATE);

INSERT INTO Accounts
VALUES (2,2,'Checking',1500,SYSDATE);

INSERT INTO Accounts
VALUES (3,3,'Savings',5000,SYSDATE);

INSERT INTO Transactions
VALUES (1,1,SYSDATE,200,'Deposit');

INSERT INTO Transactions
VALUES (2,2,SYSDATE,300,'Withdrawal');

INSERT INTO Transactions
VALUES (3,3,SYSDATE,500,'Deposit');

INSERT INTO Loans
VALUES
(1,1,5000,5,SYSDATE,SYSDATE+20);

INSERT INTO Loans
VALUES
(2,2,10000,7,SYSDATE,SYSDATE+90);

INSERT INTO Loans
VALUES
(3,3,8000,6,SYSDATE,SYSDATE+15);

INSERT INTO Employees
VALUES
(1,'Alice Johnson','Manager',70000,'HR',
TO_DATE('2015-06-15','YYYY-MM-DD'));

INSERT INTO Employees
VALUES
(2,'Bob Brown','Developer',60000,'IT',
TO_DATE('2017-03-20','YYYY-MM-DD'));

INSERT INTO Employees
VALUES
(3,'David Lee','Developer',55000,'IT',
TO_DATE('2019-01-10','YYYY-MM-DD'));

COMMIT;

SELECT * FROM Customers;

SELECT * FROM Accounts;

SELECT * FROM Transactions;

SELECT * FROM Loans;

SELECT * FROM Employees;

BEGIN
    FOR cust IN
    (
        SELECT c.CustomerID,
               FLOOR(MONTHS_BETWEEN(SYSDATE,c.DOB)/12) Age,
               l.LoanID
        FROM Customers c
        JOIN Loans l
        ON c.CustomerID=l.CustomerID
    )
    LOOP

        IF cust.Age > 60 THEN

            UPDATE Loans
            SET InterestRate=InterestRate-1
            WHERE LoanID=cust.LoanID;

            DBMS_OUTPUT.PUT_LINE
            ('Discount applied to Customer '
            ||cust.CustomerID);

        END IF;

    END LOOP;

    COMMIT;
END;

SELECT * FROM Loans;


BEGIN

    FOR cust IN
    (
        SELECT CustomerID,Balance
        FROM Customers
    )
    LOOP

        IF cust.Balance>10000 THEN

            UPDATE Customers
            SET IsVIP='TRUE'
            WHERE CustomerID=cust.CustomerID;

            DBMS_OUTPUT.PUT_LINE
            ('VIP Updated for Customer '
            ||cust.CustomerID);

        END IF;

    END LOOP;

    COMMIT;

END;

SELECT * FROM Customers;

BEGIN

    FOR loan IN
    (
        SELECT LoanID,
               CustomerID,
               EndDate
        FROM Loans
        WHERE EndDate BETWEEN SYSDATE
        AND SYSDATE+30
    )
    LOOP

        DBMS_OUTPUT.PUT_LINE(
        'Reminder: Customer '
        ||loan.CustomerID
        ||' Loan '
        ||loan.LoanID
        ||' Due Date '
        ||TO_CHAR(loan.EndDate,'DD-MON-YYYY'));

    END LOOP;

END;