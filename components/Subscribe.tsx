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
      localStorage.setItem('phone', phone);
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

      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative p-2 px-5 items-center bg-gray-100 rounded max-w-sm mx-auto">
            {!confirmationMessage ? (
              <>
                <span className="block text-xl font-medium py-1">
                  Get updates
                </span>
                <Dialog.Description>
                  <p className="py-1">
                    Subscribe to receive updates on the competition and find out
                    how your team is doing.
                  </p>
                </Dialog.Description>
                <form
                  className="py-2 flex items-center"
                  onSubmit={handleSubmit}
                  id="form1"
                >
                  <span className="font-medium text-lg pr-3">Phone:</span>
                  <input
                    className="grow shadow font-medium focus:outline-blue-200 rounded bg-gray-200 p-2 "
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </form>
                <div className="flex justify-center gap-3 py-2">
                  <button
                    className="text-white p-2 rounded-md bg-[#E57200]"
                    type="submit"
                    form="form1"
                  >
                    Subscribe
                  </button>
                  <button
                    className="p-2 w-20 rounded-md bg-gray-300"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
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
    </>
  );
}
