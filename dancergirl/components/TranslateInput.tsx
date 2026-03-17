import React, { useState } from 'react';
import { StringInputProps, set, unset } from 'sanity';
import { Button, Card, Stack, Text, TextInput, Box, Flex } from '@sanity/ui';
import { TransferIcon } from '@sanity/icons';
import { translateText } from '../lib/translate';

export function TranslateStringInput(props: StringInputProps) {
  const { onChange, value = {}, schemaType } = props;
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!value?.en) {
      alert('Please enter English text first');
      return;
    }

    setIsTranslating(true);
    try {
      const translatedText = await translateText(value.en, 'es');
      
      onChange(set({
        ...value,
        es: translatedText
      }));
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleChange = (lang: 'en' | 'es', newValue: string) => {
    if (!newValue) {
      onChange(unset());
      return;
    }
    
    onChange(set({
      ...value,
      [lang]: newValue
    }));
  };

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} tone="default">
        <Stack space={3}>
          <Text size={1} weight="semibold">English</Text>
          <TextInput
            value={value?.en || ''}
            onChange={(event) => handleChange('en', event.currentTarget.value)}
            placeholder="Enter text in English..."
          />
        </Stack>
      </Card>
      
      <Flex justify="center">
        <Button
          fontSize={1}
          icon={TransferIcon}
          mode="ghost"
          onClick={handleTranslate}
          disabled={!value?.en || isTranslating}
          text={isTranslating ? 'Translating...' : 'Translate to Spanish'}
          tone="primary"
        />
      </Flex>
      
      <Card padding={3} radius={2} tone="default">
        <Stack space={3}>
          <Text size={1} weight="semibold">Spanish</Text>
          <TextInput
            value={value?.es || ''}
            onChange={(event) => handleChange('es', event.currentTarget.value)}
            placeholder="Enter text in Spanish..."
          />
        </Stack>
      </Card>
    </Stack>
  );
}