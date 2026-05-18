Feature: Automation Test Case 2

  Scenario: Verify Fix navigation bug task is in To Do with Bug tag
    Given I login to the Demo App
    When I navigate to "Web Application"
    Then I should see "Fix navigation bug" in the "To Do" column
    And the task should have the "Bug" tag
