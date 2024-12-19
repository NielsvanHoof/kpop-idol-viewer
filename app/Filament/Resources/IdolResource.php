<?php

namespace App\Filament\Resources;

use App\Enums\MediaTypes;
use App\Filament\Resources\IdolResource\Pages;
use App\Models\Group;
use App\Models\Idol;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ForceDeleteAction;
use Filament\Tables\Actions\ForceDeleteBulkAction;
use Filament\Tables\Actions\RestoreAction;
use Filament\Tables\Actions\RestoreBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class IdolResource extends Resource
{
    protected static ?string $model = Idol::class;

    protected static ?string $slug = 'idols';

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Basic Information Section
                Section::make('Basic Information')
                    ->description('Provide essential details about the idol.')
                    ->icon('heroicon-o-information-circle')
                    ->schema([
                        TextInput::make('name')
                            ->label('Idol Name')
                            ->afterStateUpdated(function (Get $get, Set $set, ?string $state) {
                                if (! $get('is_slug_changed_manually') && filled($state)) {
                                    $set('slug', Str::slug($state));
                                }
                            })
                            ->reactive()
                            ->required()
                            ->placeholder('Enter the idol’s name'),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->afterStateUpdated(function (Set $set) {
                                $set('is_slug_changed_manually', true);
                            })
                            ->required()
                            ->placeholder('Generated automatically from the name'),

                        TextInput::make('stage_name')
                            ->label('Stage Name')
                            ->placeholder('Enter the idols stage name'),

                        TextInput::make('position')
                            ->label('Position')
                            ->placeholder('Enter the idols position in the group'),

                        Select::make('gender')
                            ->options([
                                'male' => 'Male',
                                'female' => 'Female',
                            ])
                            ->required(),

                        Hidden::make('is_slug_changed_manually')
                            ->default(false)
                            ->dehydrated(false),

                        Select::make('group_id')
                            ->label('Group')
                            ->options(fn () => Group::query()->pluck('name', 'id'))
                            ->searchable()
                            ->preload(),

                        TextInput::make('spotify_id')
                            ->label('Spotify ID')
                            ->placeholder('Enter the Spotify ID')
                            ->helperText('The unique identifier from Spotify'),

                    ])
                    ->collapsible(),

                // Biography Section
                Section::make('Biography')
                    ->icon('heroicon-o-document-text')
                    ->schema([
                        RichEditor::make('bio')
                            ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'heading'])
                            ->placeholder('Write a detailed biography for the idol'),
                    ])
                    ->collapsible(),

                // Activity Section
                Section::make('Activity')
                    ->icon('heroicon-o-calendar')
                    ->schema([
                        DatePicker::make('birth_date')
                            ->label('Birth Date')
                            ->displayFormat('d / m / Y')
                            ->helperText('When was the idol born?'),

                        DatePicker::make('debute_date')
                            ->label('Debut Date')
                            ->displayFormat('d / m / Y')
                            ->helperText('When did the idol debut?'),

                        Checkbox::make('active')
                            ->label('Active')
                            ->helperText('Indicate if the idol is currently active'),
                    ])
                    ->collapsible(),

                // Media Section
                Fieldset::make('Media')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('cover_photo')
                            ->avatar()
                            ->collection('cover_photos')
                            ->imagePreviewHeight('150')
                            ->helperText('Upload a high-quality cover photo for the idol.')
                            ->customProperties(['type' => MediaTypes::CONCEPT->value]),

                        SpatieMediaLibraryFileUpload::make('background_image')
                            ->collection('background_images')
                            ->imagePreviewHeight('150')
                            ->helperText('Upload a high-quality background image for the idol.')
                            ->customProperties(['type' => MediaTypes::CONCEPT->value]),

                        SpatieMediaLibraryFileUpload::make('gallery')
                            ->multiple()
                            ->collection('gallery')
                            ->imagePreviewHeight('150')
                            ->helperText('Upload multiple images to showcase the idols gallery.')
                            ->customProperties(['type' => MediaTypes::PHOTOSHOOT->value]),
                    ])
                    ->columns(1),

                // Social Media Section
                Section::make('Social Media')
                    ->icon('heroicon-o-share')
                    ->schema([
                        Repeater::make('social_links')
                            ->schema([
                                Select::make('platform')
                                    ->options([
                                        'twitter' => 'Twitter',
                                        'instagram' => 'Instagram',
                                        'youtube' => 'YouTube',
                                        'facebook' => 'Facebook',
                                        'tiktok' => 'TikTok',
                                    ])
                                    ->required(),
                                TextInput::make('url')
                                    ->url()
                                    ->required()
                                    ->placeholder('https://'),
                            ])
                            ->columns(2)
                            ->defaultItems(0)
                            ->reorderable(false)
                            ->createItemButtonLabel('Add Social Link')
                            ->collapsible(),
                    ])
                    ->collapsible(),

                // Metadata Section
                Section::make('Metadata')
                    ->schema([
                        Placeholder::make('created_at')
                            ->label('Created Date')
                            ->content(fn (?Idol $record): string => $record?->created_at?->diffForHumans() ?? '-'),

                        Placeholder::make('updated_at')
                            ->label('Last Modified Date')
                            ->content(fn (?Idol $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
                    ])
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('stage_name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('position')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('debute_date')
                    ->date(),

                TextColumn::make('active'),

                TextColumn::make('group.name')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
                ForceDeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListIdols::route('/'),
            'create' => Pages\CreateIdol::route('/create'),
            'edit' => Pages\EditIdol::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function getGlobalSearchEloquentQuery(): Builder
    {
        return parent::getGlobalSearchEloquentQuery()->with(['group']);
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'stage_name', 'position', 'group.name'];
    }

    public static function getGlobalSearchResultDetails(Model $record): array
    {
        $details = [];

        if ($record instanceof Idol) {
            if ($record->stage_name) {
                $details['stage name'] = $record->stage_name;
            }
            if ($record->position) {
                $details['position'] = $record->position;
            }
            if ($record->group) {
                $details['group'] = $record->group->name;
            }
        }

        return $details;
    }
}
