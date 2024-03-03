import { AlertDialog, Button, XStack, YStack } from "tamagui";

interface AlertProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

const CustomAlertDialog: React.FC<AlertProps> = ({
  title,
  description,
  isOpen,
  onClose,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          width={300}
          height={200}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>{title}</AlertDialog.Title>

            <AlertDialog.Description>{description}</AlertDialog.Description>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button theme="active">Dismiss</Button>
              </AlertDialog.Cancel>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};

export { CustomAlertDialog };
