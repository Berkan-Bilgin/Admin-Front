import React, { useState } from 'react';
import { IconButton, Popover, MenuItem } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import ReactCountryFlag from 'react-country-flag';

const LanguagePopover = () => {
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const handleLanguagePopoverOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguagePopoverClose = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    console.log(`Dil ${lang} olarak değiştirildi.`);
    handleLanguagePopoverClose();
  };

  const open = Boolean(languageAnchorEl);
  const id = open ? 'language-popover' : undefined;

  return (
    <>
      <IconButton style={{ marginRight: 32 }} color="inherit" onClick={handleLanguagePopoverOpen}>
        <TranslateIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={languageAnchorEl}
        onClose={handleLanguagePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => changeLanguage('tr')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }} // flexbox kullanarak içerikleri düzenliyoruz ve aralarında boşluk bırakıyoruz
        >
          <ReactCountryFlag
            countryCode="TR"
            svg
            style={{ width: '24px', height: '24px' }} // bayrağın boyutunu ayarlıyoruz
          />
          Türkçe
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ReactCountryFlag countryCode="GB" svg style={{ width: '24px', height: '24px' }} />
          English
        </MenuItem>
      </Popover>
    </>
  );
};

export default LanguagePopover;
