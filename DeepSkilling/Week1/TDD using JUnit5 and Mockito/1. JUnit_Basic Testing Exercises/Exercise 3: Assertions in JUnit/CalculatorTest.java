package com.cts.junit;
import static org.junit.Assert.*;
import org.junit.Test;
public class CalculatorTest {
	@Test
    public void testAddition() {
        assertEquals(5, 2 + 3);
    }

}
