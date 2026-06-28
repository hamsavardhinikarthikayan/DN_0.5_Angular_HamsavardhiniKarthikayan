JPA  
Java Persistence API (JPA) is a specification that defines standards for mapping Java objects to
database tables. It provides annotations such as @Entity, @Table, @Id and @Column but does
not implement database operations.


Hibernate is an ORM framework that implements JPA. It converts Java objects into SQL queries
and manages persistence.



Spring Data JPA builds on JPA implementations like Hibernate and reduces boilerplate code by
providing repositories such as JpaRepository. It also integrates transaction management.

Architecture
Application → Spring Data JPA → Hibernate → JPA Specification → MySQL Database
Hibernate Example
Requires opening a session, beginning a transaction, saving the object, committing or rolling back,
and closing the session.

Spring Data JPA Example
Create a repository extending JpaRepository, autowire it in a service, annotate the method with
@Transactional, and call repository.save(employee).

Comparison
JPA: Specification, no implementation.

Hibernate: ORM framework implementing JPA

Spring Data JPA: Spring abstraction over JPA that simplifies CRUD operations and reduces boilerplate.
