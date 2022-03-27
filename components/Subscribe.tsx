import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SamplePage } from "twilio/lib/rest/preview/understand/assistant/task/sample";

export default function SubscribeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = async () => {
    setConfirmationMessage("Talking to Twilio...");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const res = await sendMessage();
    if (res.err) {
      setConfirmationMessage("Something went wrong.");
    } else {
      setConfirmationMessage("You're all set! Check your DMs.");
    }
  };

  // TODO: refactor
  const sendMessage = async () => {
    try {
      const body = {
        phone,
        message: "Thank you for subscribing! You'll be getting updates soon.",
      };
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const handleClose = async () => {
    setIsOpen(false);
    // TODO: permanent fix
    await new Promise((resolve) => setTimeout(resolve, 100));
    setConfirmationMessage("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 rounded-md bg-[#E57200]"
      >
        Get Updates
      </button>
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Dialog
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={handleClose}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <div className="relative p-2 px-5 items-center bg-gray-100 rounded max-w-sm mx-auto">
              {!confirmationMessage ? (
                <>
                  <Dialog.Title>Get updates</Dialog.Title>
                  <Dialog.Description>
                    <p>
                      Subscribe to receive updates on the competition and find
                      out how your team is doing.
                    </p>
                  </Dialog.Description>
                  <form onSubmit={handleSubmit} id="form1">
                    Your phone number:
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </form>
                  <button
                    className="text-white p-1.5 rounded-md bg-[#E57200]"
                    type="submit"
                    form="form1"
                  >
                    Subscribe
                  </button>
                  <button className="p-1.5 rounded-md" onClick={handleClose}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <Dialog.Title>{confirmationMessage}</Dialog.Title>
                  <button className="p-1.5 rounded-md" onClick={handleClose}>
                    OK
                  </button>
                </>
              )}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
