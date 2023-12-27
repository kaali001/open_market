import styled from "styled-components";

const Contact = () => {

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Us</h2>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xeqdgwnq"
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input type="submit" id="send" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
padding: 2rem 0 5rem 0;
text-align: center;


.container {
  max-height:80rem;
  
  
  

  .contact-form {
    max-width: 50rem;
   
    align-items: center;
    margin: auto;
   

    .contact-inputs {
      display: flex;
      flex-direction: column;
      margin-top:2rem;
      gap: 1rem;

      input[type="submit"] {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background-color: ${({ theme }) => theme.colors.green};
          border: 1px solid ${({ theme }) => theme.colors.btn};
          color: ${({ theme }) => theme.colors.white};
          transform: scale(0.9);
        }
      }
    }

    #send{
      margin:1rem 18rem ;
    }
  }
}
`;


export default Contact;