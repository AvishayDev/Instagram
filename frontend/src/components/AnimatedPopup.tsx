import * as React from 'react';
import { styled, Theme } from '@mui/system';
import {
  Unstable_Popup as BasePopup,
  PopupChildrenProps,
} from '@mui/base/Unstable_Popup';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


interface AnimatedPopupProps {
    message:string
}

export default function AnimatedPopup(props:AnimatedPopupProps) {
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <IconButton ref={setAnchor} onClick={() => setOpen((o) => !o)} type="button">
        <InfoIcon/>
      </IconButton>
      <BasePopup anchor={anchor} open={open} withTransition>
        {(childrenProps: PopupChildrenProps) => (
          <PopAnimation {...childrenProps}>
            <PopupBody>{props.message}</PopupBody>
          </PopAnimation>
        )}
      </BasePopup>
    </div>
  );
}

function Animated(
  props: React.PropsWithChildren<{
    className?: string;
    requestOpen: boolean;
    onEnter: () => void;
    onExited: () => void;
  }>,
) {
  const { requestOpen, onEnter, onExited, children, className } = props;

  React.useEffect(() => {
    if (requestOpen) {
      onEnter();
    }
  }, [onEnter, requestOpen]);

  const handleAnimationEnd = React.useCallback(() => {
    if (!requestOpen) {
      onExited();
    }
  }, [onExited, requestOpen]);

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={className + (requestOpen ? ' open' : ' close')}
    >
      {children}
    </div>
  );
}

const PopAnimation = styled(Animated)`
  @keyframes open-animation {
    0% {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }

    50% {
      opacity: 1;
      transform: translateY(4px) scale(1.05);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes close-animation {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    50% {
      opacity: 1;
      transform: translateY(4px) scale(1.05);
    }

    100% {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
  }

  &.open {
    animation: open-animation 0.4s ease-in forwards;
  }

  &.close {
    animation: close-animation 0.4s ease-in forwards;
  }
`;

const grey = {
  50: '#f6f8fa',
  200: '#d0d7de',
  500: '#6e7781',
  700: '#424a53',
  900: '#24292f',
};

const PopupBody = styled('div')(
  ({ theme }: { theme: Theme }) => `
    width: max-content;
    padding: 0.5rem 1rem;
    margin: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    min-height: 3rem;
    display: flex;
    align-items: center;
`,
);